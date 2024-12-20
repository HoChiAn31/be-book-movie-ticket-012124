import { Bookings } from 'src/bookings/entites/bookings.entity';
import { FoodDrinkTranslations } from 'src/food-drink-translations/entites/food-drink-translations.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FoodDrinks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: string;

  @Column()
  image: string;

  @Column({ default: 0 })
  soldQuantity: number;

  @OneToMany(
    () => FoodDrinkTranslations,
    (foodDrinkTranslations) => foodDrinkTranslations.foodDrinks,
  )
  translations: FoodDrinkTranslations[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Bookings, (booking) => booking.foodDrinks)
  booking: Bookings;
}
