import { ApiProperty } from '@nestjs/swagger';
import { Branch } from 'src/branch/entities/branch.entity';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';

export class FilterBranchTranslationDto {
  page: string;

  items_per_page: string;

  search: string;

  branch: Branch;

  categoryLanguage: CategoryLanguage;
}
