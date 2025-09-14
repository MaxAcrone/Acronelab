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
        subscription: any;
        stripeSubscription: Stripe.Response<Stripe.Subscription>;
    }>;
    cancelSubscription(userId: string): Promise<any>;
    getSubscription(userId: string): Promise<any>;
    createPaymentIntent(userId: string, amount: number, currency?: string): Promise<{
        payment: any;
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
