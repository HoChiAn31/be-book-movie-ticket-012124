import { Bookings } from 'src/bookings/entites/bookings.entity';
import { Tickets } from 'src/tickets/entities/tickets.entity';
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
export class BookingDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  seatNumber: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Bookings, (booking) => booking.bookingDetails)
  booking: Bookings;

  @ManyToOne(() => Tickets, (ticket) => ticket.bookingDetails)
  tickets: Tickets;
}
