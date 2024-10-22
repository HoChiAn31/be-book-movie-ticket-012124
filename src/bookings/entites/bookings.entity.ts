import { BookingDetails } from 'src/booking-details/entities/booking-details.entity';
import { FoodDrinks } from 'src/food-drinks/entities/food-drinks.entity';
import { Payment } from 'src/payment/entities/payment.entity';
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

  @OneToMany(() => BookingDetails, (bookingDetails) => bookingDetails.booking)
  bookingDetails: BookingDetails[];

  @OneToMany(() => FoodDrinks, (foodDrinks) => foodDrinks.booking)
  foodDrinks: FoodDrinks[];

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @OneToOne(() => Payment, (payment) => payment.booking)
  @JoinColumn()
  payment: Payment;
}
