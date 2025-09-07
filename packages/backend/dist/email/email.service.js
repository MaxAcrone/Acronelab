"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const SendGrid = require("@sendgrid/mail");
let EmailService = EmailService_1 = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(EmailService_1.name);
        const sendgridApiKey = this.configService.get('SENDGRID_API_KEY');
        if (sendgridApiKey) {
            SendGrid.setApiKey(sendgridApiKey);
        }
        else {
            this.logger.warn('SendGrid API key not found. Email functionality will be limited.');
        }
    }
    async sendEmail(to, subject, html, text) {
        var _a;
        const from = this.configService.get('EMAIL_FROM') || 'noreply@example.com';
        const msg = {
            to,
            from,
            subject,
            text: text || this.stripHtml(html),
            html,
        };
        try {
            if (!this.configService.get('SENDGRID_API_KEY')) {
                this.logger.log(`[DEV MODE] Email would be sent to: ${to}, Subject: ${subject}`);
                return true;
            }
            const response = await SendGrid.send(msg);
            this.logger.log(`Email sent to ${to}, status: ${response[0].statusCode}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}`, ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.body) || error);
            return false;
        }
    }
    async sendWelcomeEmail(to, name) {
        const subject = 'Welcome to Our Platform';
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome, ${name}!</h1>
        <p>Thank you for joining our platform. We're excited to have you on board!</p>
        <p>Here are a few things you can do to get started:</p>
        <ul>
          <li>Complete your profile</li>
          <li>Explore our features</li>
          <li>Connect with other users</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Best regards,<br>The Team</p>
      </div>
    `;
        return this.sendEmail(to, subject, html);
    }
    async sendPasswordResetEmail(to, resetToken) {
        const subject = 'Password Reset Request';
        const resetUrl = `${this.configService.get('FRONTEND_URL') || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Password Reset</h1>
        <p>You requested a password reset. Please click the link below to reset your password:</p>
        <p>
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
            Reset Password
          </a>
        </p>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>The link will expire in 1 hour.</p>
        <p>Best regards,<br>The Team</p>
      </div>
    `;
        return this.sendEmail(to, subject, html);
    }
    async sendPaymentConfirmationEmail(to, name, amount, currency = 'USD') {
        const subject = 'Payment Confirmation';
        const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Payment Confirmation</h1>
        <p>Hello ${name},</p>
        <p>We're confirming your payment of ${formattedAmount} was successful.</p>
        <p>Thank you for your purchase!</p>
        <p>Best regards,<br>The Team</p>
      </div>
    `;
        return this.sendEmail(to, subject, html);
    }
    stripHtml(html) {
        return html.replace(/<[^>]*>/g, '');
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map