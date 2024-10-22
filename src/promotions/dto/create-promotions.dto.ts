import { Json } from 'sequelize/types/utils';

export class CreatePromotionsDto {
  discountType: string;
  discountValue: string;
  startDate: Date;
  endDate: Date;
  minimumPurchase: number;
  applicableMovies?: Json;
  usageLimit: number;
  usageCount: number;
  translations: {
    categoryLanguageId: string;
    name: string;
    description: string;
  }[];
}
