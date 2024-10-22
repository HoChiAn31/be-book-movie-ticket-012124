import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingDetails } from './entities/booking-details.entity';
import { BookingDetailsService } from './booking-details.service';
import { BookingDetailsController } from './booking-details.controller';
import { Tickets } from 'src/tickets/entities/tickets.entity';
import { Bookings } from 'src/bookings/entites/bookings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingDetails, Bookings, Tickets])],
  providers: [BookingDetailsService],
  controllers: [BookingDetailsController],
  exports: [BookingDetailsService],
})
export class BookingDetailsModule {}
