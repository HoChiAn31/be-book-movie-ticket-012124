import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionTranslation } from './entities/promotion-translation.entity';
import { Promotions } from '../promotions/entities/promotions.entity';
import { PromotionTranslationService } from './promotion-translation.service';
import { PromotionTranslationController } from './promotion-translation.controller';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PromotionTranslation,
      Promotions,
      CategoryLanguage,
    ]),
    ConfigModule,
  ],
  controllers: [PromotionTranslationController],
  providers: [PromotionTranslationService],
  exports: [PromotionTranslationService, TypeOrmModule],
})
export class PromotionTranslationModule {}
