import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
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
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        user: {
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
        };
        access_token: string;
        refresh_token: string;
    }>;
    getProfile(req: any): Promise<{
        user: any;
    }>;
}
