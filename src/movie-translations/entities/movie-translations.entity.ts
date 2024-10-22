import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { Movie } from 'src/movies/entities/movies.entity';
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
export class MovieTranslations {
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

  @ManyToOne(
    () => CategoryLanguage,
    (categoryLanguage) => categoryLanguage.movieTranslations,
    { onDelete: 'CASCADE' },
  )
  categoryLanguage: CategoryLanguage;

  @ManyToOne(() => Movie, (movie) => movie.translations, {
    onDelete: 'CASCADE',
  })
  movie: Movie;
}
