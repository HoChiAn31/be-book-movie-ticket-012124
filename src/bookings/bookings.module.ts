import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookings } from './entites/bookings.entity';
import { User } from 'src/user/entities/user.entity';
import { BookingDetails } from 'src/booking-details/entities/booking-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookings, User, BookingDetails])],
  providers: [BookingsService],
  controllers: [BookingsController],
  exports: [BookingsService],
})
export class BookingsModule {}
