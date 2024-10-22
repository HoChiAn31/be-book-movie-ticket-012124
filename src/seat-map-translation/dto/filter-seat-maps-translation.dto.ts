import { ApiProperty } from '@nestjs/swagger';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';

export class FilterSeatMapTranslationsDto {
  page: string;

  items_per_page: string;

  search: string;

  categoryLanguage: CategoryLanguage;
}
