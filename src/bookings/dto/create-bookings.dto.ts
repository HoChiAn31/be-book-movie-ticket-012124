import { User } from 'src/user/entities/user.entity';

export class CreateBookingDto {
  user: User;
  totalTickets: number;
  totalAmount: number;
}
