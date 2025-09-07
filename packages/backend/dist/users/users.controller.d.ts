import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        avatar: string;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
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
    }[]>;
    getProfile(req: any): Promise<{
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
    } & {
        id: string;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string): Promise<{
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
    } & {
        id: string;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    updateProfile(req: any, profileData: any): Promise<{
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
    }>;
}
