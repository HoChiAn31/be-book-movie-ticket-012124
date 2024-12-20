import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { MovieGenreTranslations } from 'src/movie-genres-translations/entities/movie-genres-traslations.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { MovieGenres } from './entities/movie-genres.entity';
import { MovieGenresController } from './movie-genres.controller';
import { MovieGenresService } from './movie-genres.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovieGenreTranslations,
      CategoryLanguage,
      Movie,
      MovieGenres,
    ]),
  ],
  controllers: [MovieGenresController],
  providers: [MovieGenresService],
  exports: [MovieGenresService, TypeOrmModule],
})
export class MovieGenresModule {}
