import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodDrinkTranslations } from './entites/food-drink-translations.entity';
import { FoodDrinkTranslationsController } from './food-drink-translations.controller';
import { FoodDrinkTranslationsService } from './food-drink-translations.service';
import { FoodDrinks } from 'src/food-drinks/entities/food-drinks.entity';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FoodDrinkTranslations,
      FoodDrinks,
      CategoryLanguage,
    ]),
    ConfigModule,
  ],
  controllers: [FoodDrinkTranslationsController],
  providers: [FoodDrinkTranslationsService],
  exports: [TypeOrmModule], // Add this line
})
export class FoodDrinkTranslationsModule {}
