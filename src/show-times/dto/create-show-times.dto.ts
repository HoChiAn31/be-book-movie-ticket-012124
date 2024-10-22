export class CreateShowTimesDto {
  show_time_start: Date;
  show_time_end: Date;
  price: number;

  roomId: string;
  movieId: string;
}
