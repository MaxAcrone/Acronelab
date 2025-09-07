import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
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
    findAll(): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        id: string;
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
    findById(id: string): Promise<{
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
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        id: string;
        avatar: string | null;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
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
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        id: string;
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
    remove(id: string): Promise<{
        message: string;
    }>;
    updateProfile(id: string, profileData: any): Promise<{
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
