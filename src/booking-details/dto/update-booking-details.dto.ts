import { Bookings } from 'src/bookings/entites/bookings.entity';
import { Tickets } from 'src/tickets/entities/tickets.entity';

export class UpdateBookingDetailsDto {
  seatNumber: number;
  price: number;
  quantity: number;
  booking: Bookings;
  tickets: Tickets;
}
