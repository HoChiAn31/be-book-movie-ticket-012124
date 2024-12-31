import { ApiProperty } from '@nestjs/swagger';

export class FilterBookingsDto {
  page: string;

  items_per_page: string;

  search: string;

  languageCode: string;
}
