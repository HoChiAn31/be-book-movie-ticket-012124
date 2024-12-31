import { Movie } from 'src/movies/entities/movies.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { ShowTimes } from 'src/show-times/entities/show-times.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateBookingDto {
  user: User;
  totalTickets: number;
  totalAmount: number;
  payment: Payment;
  showTimes: ShowTimes;
  movie: Movie;
}
