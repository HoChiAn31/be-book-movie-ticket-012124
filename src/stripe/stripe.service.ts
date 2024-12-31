import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2024-11-20.acacia',
      },
    );
  }

  async createPaymentIntent(amount: number, currency: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card'],
      });
      const successUrl = `https://your-website.com/payment-success?payment_intent=${paymentIntent.id}`;
      const failureUrl = `https://your-website.com/payment-failure?payment_intent=${paymentIntent.id}`;
      return {
        clientSecret: paymentIntent.client_secret,
        successUrl,
        failureUrl,
      };
    } catch (error) {
      throw new HttpException('Payment failed', HttpStatus.BAD_REQUEST);
    }
  }
}
