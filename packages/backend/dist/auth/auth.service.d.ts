import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private prisma;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    register(createUserDto: any): Promise<any>;
    refreshToken(userId: string): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
}
