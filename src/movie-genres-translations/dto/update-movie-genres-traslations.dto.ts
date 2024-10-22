import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';

export class UpdateMovieGenresDto {
  name: string;

  description: string;

  categoryLanguage: CategoryLanguage;
}
