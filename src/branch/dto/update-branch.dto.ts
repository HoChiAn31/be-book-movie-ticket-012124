import { Column } from 'typeorm';

export class UpdateBranchDto {
  @Column()
  email: string;

  @Column()
  phone: string;

  // ---------------------------------------
  translations: {
    languageCode: string;
    name: string;
    address: string;
    description: string;
  }[];
}
