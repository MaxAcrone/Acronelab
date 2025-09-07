import { PaymentsService } from './payments.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createSubscription(createSubscriptionDto: CreateSubscriptionDto, req: any): Promise<{
        subscription: import(".prisma/client").Prisma.BatchPayload;
        stripeSubscription: import("stripe").Stripe.Response<import("stripe").Stripe.Subscription>;
    }>;
    cancelSubscription(req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getSubscription(req: any): Promise<{
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
    createPaymentIntent(createPaymentIntentDto: CreatePaymentIntentDto, req: any): Promise<{
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
}
