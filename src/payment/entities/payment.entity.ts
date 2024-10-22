import { Bookings } from 'src/bookings/entites/bookings.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  paymentMethod: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  paymentStatus: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  paymentAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Bookings, (booking) => booking.payment)
  @JoinColumn() // Để khoá ngoại nằm ở bảng này
  booking: Bookings;
}
