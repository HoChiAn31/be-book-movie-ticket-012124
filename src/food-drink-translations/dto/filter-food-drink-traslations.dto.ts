import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';

export class FilterFoodDrinkTranslationsDto {
  page: string;

  items_per_page: string;

  search: string;

  categoryLanguage: CategoryLanguage;
}
