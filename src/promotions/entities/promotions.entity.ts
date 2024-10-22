import { PromotionTranslation } from 'src/promotion-translation/entities/promotion-translation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Promotions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  discountType: string;

  @Column({ nullable: true })
  discountValue: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  // minimum purchase amount
  @Column({ nullable: true })
  minimumPurchase: number;

  // List of movies that can apply promotion
  @Column('json', { nullable: true })
  applicableMovies: object;

  // Limited number of times promotion can be used
  @Column({ nullable: true })
  usageLimit: number;

  // Number of times the promotion has been used
  @Column({ nullable: true, default: 0 })
  usageCount: number;

  @Column({ nullable: true, default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PromotionTranslation, (translation) => translation.promotion)
  translations: PromotionTranslation[];
}
