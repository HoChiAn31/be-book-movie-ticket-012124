import { Room } from 'src/rooms/entities/rooms.entity';

export class CreateSeatMapDto {
  row: string;

  count: number;

  room: Room;
}
