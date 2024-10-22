import { Module } from '@nestjs/common';
import { CategoryLanguageController } from './category-language.controller';
import { CategoryLanguageService } from './category-language.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchTranslation } from 'src/branch-translation/entities/branch-translation.entity';
import { CategoryLanguage } from './entites/category-language.entity';
import { ConfigModule } from '@nestjs/config';

import { PromotionTranslation } from 'src/promotion-translation/entities/promotion-translation.entity';
import { MovieTranslations } from 'src/movie-translations/entities/movie-translations.entity';
import { MovieGenreTranslations } from 'src/movie-genres-translations/entities/movie-genres-traslations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BranchTranslation,
      CategoryLanguage,
      MovieGenreTranslations,
      PromotionTranslation,
      MovieTranslations,
    ]),
    ConfigModule,
  ],
  controllers: [CategoryLanguageController],
  providers: [CategoryLanguageService],
  exports: [CategoryLanguageService, TypeOrmModule],
})
export class CategoryLanguageModule {}
