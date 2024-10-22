import { BookingDetails } from 'src/booking-details/entities/booking-details.entity';
import { ShowTimes } from 'src/show-times/entities/show-times.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tickets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ticketType: string;

  @Column()
  ticketPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ShowTimes, (showTimes) => showTimes.tickets, {
    onDelete: 'CASCADE',
  })
  showTimes: ShowTimes;

  @OneToMany(() => BookingDetails, (bookingDetails) => bookingDetails.tickets)
  bookingDetails: BookingDetails[];
}
