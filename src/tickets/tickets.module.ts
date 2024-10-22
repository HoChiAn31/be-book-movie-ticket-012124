import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Tickets } from './entities/tickets.entity';
import { ShowTimes } from 'src/show-times/entities/show-times.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingDetails } from 'src/booking-details/entities/booking-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tickets, ShowTimes, BookingDetails])],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
