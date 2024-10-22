import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movies.entity';
import { MovieTranslationsModule } from '../movie-translations/movie-translations.module';
import { MovieGenresModule } from 'src/movie-genres/movie-genres.module';
import { MoviesService } from './movies.service';
import { ConfigModule } from '@nestjs/config';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { MovieGenres } from 'src/movie-genres/entities/movie-genres.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, MovieGenres]),
    MovieTranslationsModule,
    MovieGenresModule,
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class MoviesModule {}
