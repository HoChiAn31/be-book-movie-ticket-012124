import { Module } from '@nestjs/common';
import { MovieTranslationsService } from './movie-translations.service';
import { MovieTranslationsController } from './movie-translations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieTranslations } from './entities/movie-translations.entity';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { Movie } from 'src/movies/entities/movies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieTranslations])],
  providers: [MovieTranslationsService],
  controllers: [MovieTranslationsController],
  exports: [MovieTranslationsService, TypeOrmModule], // Add this line
})
export class MovieTranslationsModule {}
