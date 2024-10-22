import { Module } from '@nestjs/common';
import { PromotionsController } from './promotions.controller';
import { PromotionsService } from './promotions.service';
import { Promotions } from './entities/promotions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionTranslation } from 'src/promotion-translation/entities/promotion-translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promotions, PromotionTranslation])],
  controllers: [PromotionsController],
  providers: [PromotionsService],
})
export class PromotionsModule {}
