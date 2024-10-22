import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Bookings } from 'src/bookings/entites/bookings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Bookings])],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
