import { Bookings } from 'src/bookings/entites/bookings.entity';
import { FoodDrinkBooks } from 'src/food-drink-books/entities/foodDrink-books.entity';
import { Room } from 'src/rooms/entities/rooms.entity';
import { Tickets } from 'src/tickets/entities/tickets.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column('json')
  seatNumber: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Bookings, (booking) => booking.bookingDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'booking_id' })
  booking: Bookings;

  @OneToMany(() => Tickets, (ticket) => ticket.bookingDetails)
  tickets: Tickets[];

  @ManyToOne(() => Room, (room) => room.bookingDetails)
  room: Room;

  @OneToMany(() => FoodDrinkBooks, (foodDrinks) => foodDrinks.bookingDetails)
  foodDrinks: FoodDrinkBooks[];
}
