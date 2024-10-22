import { ApiProperty } from '@nestjs/swagger';

export class FilterMovieGenreDto {
  page: string;

  items_per_page: string;

  search: string;
}
