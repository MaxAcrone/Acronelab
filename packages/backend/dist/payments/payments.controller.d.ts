import { PaymentsService } from './payments.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createSubscription(createSubscriptionDto: CreateSubscriptionDto, req: any): Promise<{
        subscription: any;
        stripeSubscription: import("stripe").Stripe.Response<import("stripe").Stripe.Subscription>;
    }>;
    cancelSubscription(req: any): Promise<any>;
    getSubscription(req: any): Promise<any>;
    createPaymentIntent(createPaymentIntentDto: CreatePaymentIntentDto, req: any): Promise<{
        payment: any;
        clientSecret: string;
    }>;
}
