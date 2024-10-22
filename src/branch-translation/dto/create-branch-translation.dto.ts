import { Branch } from 'src/branch/entities/branch.entity';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';

export class CreateBranchTransitionDto {
  name: string;

  languageCode: string;

  address: string;

  description: string;

  branch: Branch;

  categoryLanguage: CategoryLanguage;
}
