import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-subscription')
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @Req() req: any,
  ) {
    return this.paymentsService.createSubscription(
      req.user.id,
      createSubscriptionDto.priceId,
    );
  }

  @Post('cancel-subscription')
  async cancelSubscription(@Req() req: any) {
    return this.paymentsService.cancelSubscription(req.user.id);
  }

  @Get('subscription')
  async getSubscription(@Req() req: any) {
    return this.paymentsService.getSubscription(req.user.id);
  }

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body() createPaymentIntentDto: CreatePaymentIntentDto,
    @Req() req: any,
  ) {
    return this.paymentsService.createPaymentIntent(
      req.user.id,
      createPaymentIntentDto.amount,
      createPaymentIntentDto.currency,
    );
  }
}
