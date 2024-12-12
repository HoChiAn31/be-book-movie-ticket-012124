import { Comments } from 'src/comments/entities/comments.entity';
import { MovieGenres } from 'src/movie-genres/entities/movie-genres.entity';
import { MovieTranslations } from 'src/movie-translations/entities/movie-translations.entity';
import { ShowTimes } from 'src/show-times/entities/show-times.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  director: string;

  @Column()
  cast: string;

  @Column()
  releaseDate: Date;

  @Column()
  duration: number;

  @Column()
  language: string;

  @Column()
  country: string;

  @Column()
  rating: number;

  @Column()
  poster_url: string;

  @Column()
  trailer_url: string;

  @Column()
  is_showing: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MovieGenres, (genre) => genre.movies)
  genres: MovieGenres[];

  @OneToMany(
    () => MovieTranslations,
    (movieTranslations) => movieTranslations.movie,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'movieId' })
  translations: MovieTranslations[];

  @OneToMany(() => ShowTimes, (showTime) => showTime.movie)
  showTimes: ShowTimes[];

  @OneToMany(() => Comments, (comment) => comment.movie)
  comments: Comments[];
}
