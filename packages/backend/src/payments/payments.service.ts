import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-08-16',
    });
  }

  async createCustomer(userId: string, email: string, firstName?: string, lastName?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create Stripe customer
    const customer = await this.stripe.customers.create({
      email,
      name: `${firstName || ''} ${lastName || ''}`.trim() || undefined,
      metadata: {
        userId,
      },
    });

    // Update user subscription with Stripe customer ID
    await this.prisma.subscription.updateMany({
      where: { userId },
      data: {
        stripeCustomerId: customer.id,
      },
    });

    return customer;
  }

  async createSubscription(userId: string, priceId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { subscriptions: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let subscription = user.subscriptions[0];

    if (!subscription.stripeCustomerId) {
      // Create customer first
      const customer = await this.createCustomer(
        userId,
        user.email,
        user.firstName,
        user.lastName,
      );
      subscription.stripeCustomerId = customer.id;
    }

    // Create Stripe subscription
    const stripeSubscription = await this.stripe.subscriptions.create({
      customer: subscription.stripeCustomerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // Update local subscription
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

  async cancelSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findFirst({
      where: { userId },
    });

    if (!subscription || !subscription.stripeSubscriptionId) {
      throw new NotFoundException('Subscription not found');
    }

    // Cancel at period end
    await this.stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    // Update local subscription
    const updatedSubscription = await this.prisma.subscription.updateMany({
      where: { userId },
      data: {
        cancelAtPeriodEnd: true,
      },
    });

    return updatedSubscription;
  }

  async getSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findFirst({
      where: { userId },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async createPaymentIntent(userId: string, amount: number, currency: string = 'usd') {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { subscriptions: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create Stripe payment intent
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      customer: user.subscriptions[0]?.stripeCustomerId,
      metadata: {
        userId,
      },
    });

    // Create local payment record
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

  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err) {
      throw new BadRequestException('Invalid webhook signature');
    }

    switch (event.type) {
      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
    }

    return { received: true };
  }

  private async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    if (invoice.subscription) {
      // Update subscription status
      await this.prisma.subscription.updateMany({
        where: { stripeSubscriptionId: invoice.subscription as string },
        data: {
          status: 'ACTIVE',
        },
      });
    }

    // Update payment status
    if (invoice.payment_intent) {
      await this.prisma.payment.updateMany({
        where: { stripePaymentIntentId: invoice.payment_intent as string },
        data: {
          status: 'SUCCEEDED',
        },
      });
    }
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    if (invoice.subscription) {
      await this.prisma.subscription.updateMany({
        where: { stripeSubscriptionId: invoice.subscription as string },
        data: {
          status: 'PAST_DUE',
        },
      });
    }

    if (invoice.payment_intent) {
      await this.prisma.payment.updateMany({
        where: { stripePaymentIntentId: invoice.payment_intent as string },
        data: {
          status: 'FAILED',
        },
      });
    }
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
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

  private mapStripeStatus(stripeStatus: string): string {
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
}
