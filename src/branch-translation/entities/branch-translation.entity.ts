import { Branch } from 'src/branch/entities/branch.entity';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class BranchTranslation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: () => 'NULL' })
  languageCode: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Branch, (branch) => branch.translations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => CategoryLanguage,
    (categoryLanguage) => categoryLanguage.branchTranslations,
    {
      onDelete: 'CASCADE',
    },
  )
  categoryLanguage: CategoryLanguage;
}
