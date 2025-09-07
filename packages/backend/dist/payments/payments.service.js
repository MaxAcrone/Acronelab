"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const stripe_1 = require("stripe");
let PaymentsService = class PaymentsService {
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2023-08-16',
        });
    }
    async createCustomer(userId, email, firstName, lastName) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const customer = await this.stripe.customers.create({
            email,
            name: `${firstName || ''} ${lastName || ''}`.trim() || undefined,
            metadata: {
                userId,
            },
        });
        await this.prisma.subscription.updateMany({
            where: { userId },
            data: {
                stripeCustomerId: customer.id,
            },
        });
        return customer;
    }
    async createSubscription(userId, priceId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { subscriptions: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        let subscription = user.subscriptions[0];
        if (!subscription.stripeCustomerId) {
            const customer = await this.createCustomer(userId, user.email, user.firstName, user.lastName);
            subscription.stripeCustomerId = customer.id;
        }
        const stripeSubscription = await this.stripe.subscriptions.create({
            customer: subscription.stripeCustomerId,
            items: [{ price: priceId }],
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent'],
        });
        const updatedSubscription = await this.prisma.subscription.updateMany({
            where: { userId },
            data: {
                stripePriceId: priceId,
                stripeSubscriptionId: stripeSubscription.id,
                status: this.mapStripeStatus(stripeSubscription.status),
                currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
                currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
            },
        });
        return {
            subscription: updatedSubscription,
            stripeSubscription,
        };
    }
    async cancelSubscription(userId) {
        const subscription = await this.prisma.subscription.findFirst({
            where: { userId },
        });
        if (!subscription || !subscription.stripeSubscriptionId) {
            throw new common_1.NotFoundException('Subscription not found');
        }
        await this.stripe.subscriptions.update(subscription.stripeSubscriptionId, {
            cancel_at_period_end: true,
        });
        const updatedSubscription = await this.prisma.subscription.updateMany({
            where: { userId },
            data: {
                cancelAtPeriodEnd: true,
            },
        });
        return updatedSubscription;
    }
    async getSubscription(userId) {
        const subscription = await this.prisma.subscription.findFirst({
            where: { userId },
        });
        if (!subscription) {
            throw new common_1.NotFoundException('Subscription not found');
        }
        return subscription;
    }
    async createPaymentIntent(userId, amount, currency = 'usd') {
        var _a;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { subscriptions: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount,
            currency,
            customer: (_a = user.subscriptions[0]) === null || _a === void 0 ? void 0 : _a.stripeCustomerId,
            metadata: {
                userId,
            },
        });
        const payment = await this.prisma.payment.create({
            data: {
                userId,
                stripePaymentIntentId: paymentIntent.id,
                amount,
                currency,
                status: 'PENDING',
                description: `Payment of ${amount / 100} ${currency.toUpperCase()}`,
            },
        });
        return {
            payment,
            clientSecret: paymentIntent.client_secret,
        };
    }
    async handleWebhook(signature, payload) {
        const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        }
        catch (err) {
            throw new common_1.BadRequestException('Invalid webhook signature');
        }
        switch (event.type) {
            case 'invoice.payment_succeeded':
                await this.handlePaymentSucceeded(event.data.object);
                break;
            case 'invoice.payment_failed':
                await this.handlePaymentFailed(event.data.object);
                break;
            case 'customer.subscription.updated':
                await this.handleSubscriptionUpdated(event.data.object);
                break;
        }
        return { received: true };
    }
    async handlePaymentSucceeded(invoice) {
        if (invoice.subscription) {
            await this.prisma.subscription.updateMany({
                where: { stripeSubscriptionId: invoice.subscription },
                data: {
                    status: 'ACTIVE',
                },
            });
        }
        if (invoice.payment_intent) {
            await this.prisma.payment.updateMany({
                where: { stripePaymentIntentId: invoice.payment_intent },
                data: {
                    status: 'SUCCEEDED',
                },
            });
        }
    }
    async handlePaymentFailed(invoice) {
        if (invoice.subscription) {
            await this.prisma.subscription.updateMany({
                where: { stripeSubscriptionId: invoice.subscription },
                data: {
                    status: 'PAST_DUE',
                },
            });
        }
        if (invoice.payment_intent) {
            await this.prisma.payment.updateMany({
                where: { stripePaymentIntentId: invoice.payment_intent },
                data: {
                    status: 'FAILED',
                },
            });
        }
    }
    async handleSubscriptionUpdated(subscription) {
        await this.prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscription.id },
            data: {
                status: this.mapStripeStatus(subscription.status),
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                cancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
        });
    }
    mapStripeStatus(stripeStatus) {
        switch (stripeStatus) {
            case 'active':
                return 'ACTIVE';
            case 'incomplete':
            case 'incomplete_expired':
                return 'INACTIVE';
            case 'past_due':
                return 'PAST_DUE';
            case 'canceled':
                return 'CANCELED';
            case 'unpaid':
                return 'UNPAID';
            default:
                return 'INACTIVE';
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map