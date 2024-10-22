import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';

export class FilterPromotionTranslationDto {
  page: string;

  items_per_page: string;

  search: string;

  categoryLanguage: CategoryLanguage;
}
