import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
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
export class FoodDrinkTranslations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => FoodDrinks, (foodDrinks) => foodDrinks.translations, {
    onDelete: 'CASCADE',
  })
  foodDrinks: FoodDrinks;

  @ManyToOne(
    () => CategoryLanguage,
    (categoryLanguage) => categoryLanguage.foodDrinkTranslations,
  )
  categoryLanguage: CategoryLanguage;
}
