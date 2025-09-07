import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';
export declare class PaymentsService {
    private configService;
    private prisma;
    private stripe;
    constructor(configService: ConfigService, prisma: PrismaService);
    createCustomer(userId: string, email: string, firstName?: string, lastName?: string): Promise<Stripe.Response<Stripe.Customer>>;
    createSubscription(userId: string, priceId: string): Promise<{
        subscription: import(".prisma/client").Prisma.BatchPayload;
        stripeSubscription: Stripe.Response<Stripe.Subscription>;
    }>;
    cancelSubscription(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getSubscription(userId: string): Promise<{
        userId: string;
        id: string;
        stripeCustomerId: string | null;
        stripePriceId: string | null;
        stripeSubscriptionId: string | null;
        status: string;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelAtPeriodEnd: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createPaymentIntent(userId: string, amount: number, currency?: string): Promise<{
        payment: {
            userId: string;
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            stripePaymentIntentId: string;
            amount: number;
            currency: string;
            description: string | null;
            metadata: string | null;
        };
        clientSecret: string;
    }>;
    handleWebhook(signature: string, payload: Buffer): Promise<{
        received: boolean;
    }>;
    private handlePaymentSucceeded;
    private handlePaymentFailed;
    private handleSubscriptionUpdated;
    private mapStripeStatus;
}
