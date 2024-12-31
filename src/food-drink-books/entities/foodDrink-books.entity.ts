import { BookingDetails } from 'src/booking-details/entities/booking-details.entity';
import { Bookings } from 'src/bookings/entites/bookings.entity';
import { FoodDrinks } from 'src/food-drinks/entities/food-drinks.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FoodDrinkBooks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FoodDrinks, (foodDrinks) => foodDrinks.foodDrink)
  foodDrinks: FoodDrinks;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BookingDetails, (book) => book.foodDrinks, {
    onDelete: 'CASCADE',
  })
  bookingDetails: BookingDetails;
}
