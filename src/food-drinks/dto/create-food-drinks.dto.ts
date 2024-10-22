import { Bookings } from 'src/bookings/entites/bookings.entity';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { FoodDrinkTranslations } from 'src/food-drink-translations/entites/food-drink-translations.entity';

export class CreateFoodDrinkDto {
  price: string;

  image: string;

  translations: {
    categoryLanguageId: string;
    name: string;
    description: string;
  }[];
}
