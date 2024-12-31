import { Module } from '@nestjs/common';
import { FoodDrinkBooksController } from './food-drink-books.controller';
import { FoodDrinkBooksService } from './food-drink-books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodDrinkBooks } from './entities/foodDrink-books.entity';
import { Bookings } from 'src/bookings/entites/bookings.entity';
import { FoodDrinks } from 'src/food-drinks/entities/food-drinks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodDrinkBooks, Bookings, FoodDrinks])],
  controllers: [FoodDrinkBooksController],
  providers: [FoodDrinkBooksService],
})
export class FoodDrinkBooksModule {}
