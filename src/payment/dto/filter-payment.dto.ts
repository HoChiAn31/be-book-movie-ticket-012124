import { ApiProperty } from '@nestjs/swagger';

export class FilterPaymentDto {
  page: string;

  items_per_page: string;

  search: string;
}
