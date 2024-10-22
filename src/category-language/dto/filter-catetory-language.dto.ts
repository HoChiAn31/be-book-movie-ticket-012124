import { ApiProperty } from '@nestjs/swagger';

export class FilterCategoryLanguageDto {
  page: string;

  items_per_page: string;

  search: string;
}
