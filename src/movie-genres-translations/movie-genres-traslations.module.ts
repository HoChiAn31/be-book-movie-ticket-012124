import { Module } from '@nestjs/common';
import { MovieGenreTraslationsController } from './movie-genres-traslations.controller';
import { MovieGenresTranslationService } from './movie-genres-traslations.service';
import { MovieGenreTranslations } from './entities/movie-genres-traslations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { MovieGenres } from 'src/movie-genres/entities/movie-genres.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovieGenreTranslations,
      CategoryLanguage,
      Movie,
      MovieGenres,
    ]),
  ],
  controllers: [MovieGenreTraslationsController],
  providers: [MovieGenresTranslationService],
  exports: [MovieGenresTranslationService, TypeOrmModule], // Add this line
})
export class MovieGenreTranslstionsModule {}
