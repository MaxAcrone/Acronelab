import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: any): Promise<{
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            bio: string | null;
            website: string | null;
            location: string | null;
            company: string | null;
            jobTitle: string | null;
            skills: string | null;
            experience: string | null;
            education: string | null;
            socialLinks: string | null;
        };
        subscriptions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            stripeCustomerId: string | null;
            stripePriceId: string | null;
            stripeSubscriptionId: string | null;
            status: string;
            currentPeriodStart: Date | null;
            currentPeriodEnd: Date | null;
            cancelAtPeriodEnd: boolean;
        }[];
        payments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: string;
            stripePaymentIntentId: string;
            amount: number;
            currency: string;
            description: string | null;
            metadata: string | null;
        }[];
        email: string;
        firstName: string | null;
        lastName: string | null;
        id: string;
        avatar: string | null;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
