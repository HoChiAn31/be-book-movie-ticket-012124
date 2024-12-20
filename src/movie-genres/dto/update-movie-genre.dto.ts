import { MovieGenreTranslations } from 'src/movie-genres-translations/entities/movie-genres-traslations.entity';

export class UpdateMovieGenreDto {
  numberCategory: string;
  movieGenreTranslation: {
    categoryLanguageId: string;
    name: string;
    description: string;
  }[];
  //   movieGenreTranslation: MovieGenreTranslations;
}
