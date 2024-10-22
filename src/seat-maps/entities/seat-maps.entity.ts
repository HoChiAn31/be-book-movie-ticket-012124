import { Room } from 'src/rooms/entities/rooms.entity';
import { SeatMapTranslation } from 'src/seat-map-translation/entities/seat-map-translation.entity';
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
export class SeatMap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  row: string;

  @Column()
  count: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Room, (room) => room.seatMaps)
  room: Room;

  @OneToMany(() => SeatMapTranslation, (translation) => translation.seatMap)
  @JoinColumn({ name: 'seatMapId' })
  translations: SeatMapTranslation[];
}
