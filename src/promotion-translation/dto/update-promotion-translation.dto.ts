import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { Promotions } from 'src/promotions/entities/promotions.entity';

export class UpdatePromotionTranslationDto {
  name: string;

  description: string;

  promotion: Promotions;

  categoryLanguage: CategoryLanguage;
}
