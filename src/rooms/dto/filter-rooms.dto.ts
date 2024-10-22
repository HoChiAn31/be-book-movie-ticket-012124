import { ApiProperty } from '@nestjs/swagger';

export class FilterRoomsDto {
  page: string;

  items_per_page: string;

  search: string;
}
