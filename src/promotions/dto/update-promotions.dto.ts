import { Json } from 'sequelize/types/utils';

export class UpdatePromotionsDto {
  discountType: string;

  discountValue: string;

  startDate: Date;

  endDate: Date;

  minimumPurchase: number;

  applicableMovies: Record<string, any>;

  usageLimit: number;

  usageCount: number;

  isActive: boolean;

  translations: {
    categoryLanguage: string;
    name: string;
    description: string;
  }[];
}
