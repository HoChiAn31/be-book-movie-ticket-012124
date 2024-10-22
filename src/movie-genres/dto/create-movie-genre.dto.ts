import { MovieGenreTranslations } from 'src/movie-genres-translations/entities/movie-genres-traslations.entity';

export class CreateMovieGenreDto {
  numberCategory: number;

  movieGenreTranslation: {
    categoryLanguageId: string;
    name: string;
    description: string;
  }[];
}
