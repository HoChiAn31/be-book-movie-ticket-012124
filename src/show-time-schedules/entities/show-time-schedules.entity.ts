import { Movie } from 'src/movies/entities/movies.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ShowTimeSchedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  show_time_start: Date;

  @Column()
  show_time_end: Date;

  @ManyToOne(() => Movie, (movie) => movie.showTimeSchedules, {
    onDelete: 'CASCADE',
  })
  movie: Movie;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
