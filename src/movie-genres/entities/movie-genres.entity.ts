import { MovieGenreTranslations } from 'src/movie-genres-translations/entities/movie-genres-traslations.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  // @ManyToOne(() => Movie, (movie) => movie.genres)
  // movies: Movie;

  @ManyToMany(() => Movie, (movie) => movie.genres, {
    onDelete: 'CASCADE', // Xóa thể loại không làm mất liên kết trong bảng trung gian
  })
  movies: Movie[];
}
