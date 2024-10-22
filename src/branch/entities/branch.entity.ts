import { BranchTranslation } from 'src/branch-translation/entities/branch-translation.entity';
import { Room } from 'src/rooms/entities/rooms.entity';
import { ShowTimes } from 'src/show-times/entities/show-times.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BranchTranslation, (translation) => translation.branch)
  translations: BranchTranslation[];

  @OneToMany(() => Room, (room) => room.branch)
  rooms: Room[];
}
