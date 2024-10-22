export class CreatePaymentDto {
  bookingId: string;
  amount: number;
  paymentMethod: string;
  paymentAmount: number;
  paymentStatus: string;
}
