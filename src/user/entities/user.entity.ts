import { UUID } from 'crypto';
import { Bookings } from 'src/bookings/entites/bookings.entity';
import { Comments } from 'src/comments/entities/comments.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: () => 'NULL' })
  refreshToken: string;

  @Column({ nullable: true, default: 'user' })
  role: string;

  @Column({ nullable: true, default: () => 'NULL' })
  avatar: string;

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Bookings, (bookings) => bookings.user)
  bookings: Bookings[];

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordExpires: Date;

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];
}
