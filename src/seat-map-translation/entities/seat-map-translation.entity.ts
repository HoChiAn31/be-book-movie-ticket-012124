import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { SeatMap } from 'src/seat-maps/entities/seat-maps.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SeatMapTranslation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => SeatMap, (seatMap) => seatMap.translations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seatMapId' })
  seatMap: SeatMap;

  @ManyToOne(
    () => CategoryLanguage,
    (categoryLanguage) => categoryLanguage.seatMapTranslations,
  )
  @JoinColumn({ name: 'categoryLanguageId' })
  categoryLanguage: CategoryLanguage;
}
