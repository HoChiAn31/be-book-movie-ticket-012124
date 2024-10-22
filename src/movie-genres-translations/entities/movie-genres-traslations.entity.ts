import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { MovieGenres } from 'src/movie-genres/entities/movie-genres.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MovieGenreTranslations {
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
    (categoryLanguage) => categoryLanguage.movieGenreTranslations,
    { onDelete: 'CASCADE' },
  )
  categoryLanguage: CategoryLanguage;

  @ManyToOne(
    () => MovieGenres,
    (movieGenre) => movieGenre.movieGenreTranslation,
    { onDelete: 'CASCADE' },
  )
  movieGenres: MovieGenres;
}
