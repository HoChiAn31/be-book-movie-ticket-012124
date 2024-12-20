import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private paymentService: StripeService) {}

  @Post('create-intent')
  @HttpCode(HttpStatus.CREATED)
  async createPaymentIntent(
    @Body() body: { amount: number; currency: string },
  ) {
    const { amount, currency } = body;
    return this.paymentService.createPaymentIntent(amount, currency);
  }
}
