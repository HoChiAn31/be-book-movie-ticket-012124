import { Module } from '@nestjs/common';
import { SeatMapTranslationController } from './seat-map-translation.controller';
import { SeatMapTranslationService } from './seat-map-translation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatMapTranslation } from './entities/seat-map-translation.entity';
import { SeatMap } from 'src/seat-maps/entities/seat-maps.entity';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeatMapTranslation, SeatMap, CategoryLanguage]),
    ConfigModule,
  ],
  controllers: [SeatMapTranslationController],
  providers: [SeatMapTranslationService],
})
export class SeatMapTranslationModule {}
