import { BookingDetails } from 'src/booking-details/entities/booking-details.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { SeatMap } from 'src/seat-maps/entities/seat-maps.entity';
import { ShowTimes } from 'src/show-times/entities/show-times.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  screeningType: string;

  @Column()
  totalSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Branch, (branch) => branch.rooms)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => SeatMap, (seatMap) => seatMap.room)
  seatMaps: SeatMap[];

  @OneToMany(() => ShowTimes, (showTimes) => showTimes.room)
  showTimes: ShowTimes[];

  @OneToMany(() => BookingDetails, (bookingDetail) => bookingDetail.room)
  bookingDetails: BookingDetails[];
}
