import { BookingDetails } from 'src/booking-details/entities/booking-details.entity';
import { FoodDrinkBooks } from 'src/food-drink-books/entities/foodDrink-books.entity';
import { FoodDrinks } from 'src/food-drinks/entities/food-drinks.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { ShowTimes } from 'src/show-times/entities/show-times.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bookings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  totalTickets: number;

  @Column()
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => BookingDetails, (bookingDetails) => bookingDetails.booking, {
    onDelete: 'CASCADE',
  })
  bookingDetails: BookingDetails;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @OneToOne(() => Payment, (payment) => payment.booking)
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => ShowTimes, (showtime) => showtime.bookings)
  showTimes: ShowTimes;

  @ManyToOne(() => Movie, (movie) => movie.bookings)
  movie: Movie;
}
