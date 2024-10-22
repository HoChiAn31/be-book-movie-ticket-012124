import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';

export class CreateMovieGenresDto {
  name: string;

  description: string;

  categoryLanguageId: string;
}
