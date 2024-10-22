import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { Promotions } from 'src/promotions/entities/promotions.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PromotionTranslation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Promotions, (promotion) => promotion.translations, {
    onDelete: 'CASCADE',
  })
  promotion: Promotions;

  @ManyToOne(
    () => CategoryLanguage,
    (categoryLanguage) => categoryLanguage.branchTranslations,
  )
  categoryLanguage: CategoryLanguage;
}
