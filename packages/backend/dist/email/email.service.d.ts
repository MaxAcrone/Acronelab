import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, html: string, text?: string): Promise<boolean>;
    sendWelcomeEmail(to: string, name: string): Promise<boolean>;
    sendPasswordResetEmail(to: string, resetToken: string): Promise<boolean>;
    sendPaymentConfirmationEmail(to: string, name: string, amount: number, currency?: string): Promise<boolean>;
    private stripHtml;
}
