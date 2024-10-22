import { ApiProperty } from '@nestjs/swagger';

export class FilterBranchDto {
  page: string;

  items_per_page: string;

  search: string;
}
