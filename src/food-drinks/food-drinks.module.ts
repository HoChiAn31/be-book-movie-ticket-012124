import { Module } from '@nestjs/common';
import { FoodDrinksController } from './food-drinks.controller';
import { FoodDrinksService } from './food-drinks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodDrinks } from './entities/food-drinks.entity';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { FoodDrinkTranslations } from 'src/food-drink-translations/entites/food-drink-translations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FoodDrinks,
      CategoryLanguage,
      FoodDrinkTranslations,
    ]),
  ],
  controllers: [FoodDrinksController],
  providers: [FoodDrinksService],
})
export class FoodDrinksModule {}
