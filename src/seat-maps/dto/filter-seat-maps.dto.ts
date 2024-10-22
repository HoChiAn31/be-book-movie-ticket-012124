import { ApiProperty } from '@nestjs/swagger';

export class FilterSeatMapsDto {
  page: string;

  items_per_page: string;

  search: string;
}
