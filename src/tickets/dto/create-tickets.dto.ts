import { ShowTimes } from 'src/show-times/entities/show-times.entity';

export class CreateTicketsDto {
  ticketType: string;
  ticketPrice: number;
  showTimes: ShowTimes;
}
