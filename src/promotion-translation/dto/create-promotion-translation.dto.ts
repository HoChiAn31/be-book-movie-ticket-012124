import { Promotions } from 'src/promotions/entities/promotions.entity';

export class CreatePromotionTranslationDto {
  name: string;

  description: string;

  promotion: Promotions;
}
