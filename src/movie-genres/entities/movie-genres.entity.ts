import { MovieGenreTranslations } from 'src/movie-genres-translations/entities/movie-genres-traslations.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MovieGenres {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numberCategory: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => MovieGenreTranslations,
    (movieGenreTranslation) => movieGenreTranslation.movieGenres,
    { onDelete: 'CASCADE' },
  )
  movieGenreTranslation: MovieGenreTranslations[];

  @ManyToOne(() => Movie, (movie) => movie.genres)
  movies: Movie;
}
