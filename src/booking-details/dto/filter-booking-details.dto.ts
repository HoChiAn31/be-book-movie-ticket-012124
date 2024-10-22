import { ApiProperty } from '@nestjs/swagger';

export class FilterBookingDetailsDto {
  page: string;

  items_per_page: string;

  search: string;
}
