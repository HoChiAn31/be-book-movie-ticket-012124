import { BranchTranslation } from 'src/branch-translation/entities/branch-translation.entity';
import { FoodDrinkTranslations } from 'src/food-drink-translations/entites/food-drink-translations.entity';
import { MovieGenreTranslations } from 'src/movie-genres-translations/entities/movie-genres-traslations.entity';
import { MovieTranslations } from 'src/movie-translations/entities/movie-translations.entity';
import { PromotionTranslation } from 'src/promotion-translation/entities/promotion-translation.entity';
import { SeatMapTranslation } from 'src/seat-map-translation/entities/seat-map-translation.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CategoryLanguage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  languageCode: string;

  @Column({ nullable: true, default: () => 'NULL' })
  flag: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => BranchTranslation,
    (branchTranslation) => branchTranslation.categoryLanguage,
  )
  branchTranslations: BranchTranslation[];

  @OneToMany(
    () => MovieGenreTranslations,
    (movieGenres) => movieGenres.categoryLanguage,
  )
  movieGenreTranslations: MovieGenreTranslations[];

  @OneToMany(
    () => PromotionTranslation,
    (promotionTranslation) => promotionTranslation.categoryLanguage,
  )
  promotionTranslations: PromotionTranslation[];

  @OneToMany(() => SeatMapTranslation, (translation) => translation.seatMap)
  seatMapTranslations: SeatMapTranslation[];

  @OneToMany(
    () => FoodDrinkTranslations,
    (foodDrinkTranslations) => foodDrinkTranslations.categoryLanguage,
  )
  foodDrinkTranslations: FoodDrinkTranslations[];

  @OneToMany(
    () => MovieTranslations,
    (movieTranslations) => movieTranslations.categoryLanguage,
  )
  movieTranslations: MovieTranslations[];
}
