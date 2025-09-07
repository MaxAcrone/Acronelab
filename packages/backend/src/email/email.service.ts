import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {
    const sendgridApiKey = this.configService.get<string>('SENDGRID_API_KEY');
    if (sendgridApiKey) {
      SendGrid.setApiKey(sendgridApiKey);
    } else {
      this.logger.warn('SendGrid API key not found. Email functionality will be limited.');
    }
  }

  async sendEmail(to: string, subject: string, html: string, text?: string) {
    const from = this.configService.get<string>('EMAIL_FROM') || 'noreply@example.com';
    
    const msg = {
      to,
      from,
      subject,
      text: text || this.stripHtml(html),
      html,
    };

    try {
      if (!this.configService.get<string>('SENDGRID_API_KEY')) {
        this.logger.log(`[DEV MODE] Email would be sent to: ${to}, Subject: ${subject}`);
        return true;
      }
      
      const response = await SendGrid.send(msg);
      this.logger.log(`Email sent to ${to}, status: ${response[0].statusCode}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error?.response?.body || error);
      return false;
    }
  }

  async sendWelcomeEmail(to: string, name: string) {
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

  async sendPasswordResetEmail(to: string, resetToken: string) {
    const subject = 'Password Reset Request';
    const resetUrl = `${this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
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

  async sendPaymentConfirmationEmail(to: string, name: string, amount: number, currency: string = 'USD') {
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

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }
}
