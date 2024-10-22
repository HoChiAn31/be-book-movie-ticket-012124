import { Bookings } from 'src/bookings/entites/bookings.entity';
import { FoodDrinkTranslations } from 'src/food-drink-translations/entites/food-drink-translations.entity';

export class UpdateFoodDrinkDto {
  price: string;

  image: string;

  translations: {
    categoryLanguage: string;
    name: string;
    description: string;
  }[];
}
