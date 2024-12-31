import { Bookings } from 'src/bookings/entites/bookings.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { Room } from 'src/rooms/entities/rooms.entity';
import { Tickets } from 'src/tickets/entities/tickets.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ShowTimes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  show_time_start: Date;

  @Column()
  show_time_end: Date;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Room, (room) => room.showTimes, {
    onDelete: 'CASCADE',
  })
  room: Room;

  @ManyToOne(() => Movie, (movie) => movie.showTimes, {
    onDelete: 'CASCADE',
  })
  movie: Movie;

  @OneToMany(() => Bookings, (booking) => booking.showTimes)
  bookings: Bookings[];
}
