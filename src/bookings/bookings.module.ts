import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookings } from './entites/bookings.entity';
import { User } from 'src/user/entities/user.entity';
import { BookingDetails } from 'src/booking-details/entities/booking-details.entity';
import { FoodDrinkBooks } from 'src/food-drink-books/entities/foodDrink-books.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Tickets } from 'src/tickets/entities/tickets.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bookings,
      User,
      BookingDetails,
      FoodDrinkBooks,
      Payment,
      Tickets,
    ]),
  ],
  providers: [BookingsService],
  controllers: [BookingsController],
  exports: [BookingsService],
})
export class BookingsModule {}
