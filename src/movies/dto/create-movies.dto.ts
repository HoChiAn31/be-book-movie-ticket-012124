export class CreateMoviesDto {
  director: string;
  cast: string;
  releaseDate: Date;
  duration: number;
  language: string;
  country: string;
  rating: number;
  poster_url: string;
  trailer_url: string;
  is_showing: boolean;

  translations: {
    categoryLanguageId: string;
    name: string;
    description: string;
  }[];

  genres: { id: string }[];
}
