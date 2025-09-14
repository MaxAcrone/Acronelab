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
    register(registerDto: RegisterDto): Promise<any>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    getProfile(req: any): Promise<{
        user: any;
    }>;
}
