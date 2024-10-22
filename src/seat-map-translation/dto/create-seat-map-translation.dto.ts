import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { SeatMap } from 'src/seat-maps/entities/seat-maps.entity';

export class CreateSeatMapTranslationDto {
  //   @IsString()
  //   @IsNotEmpty()
  type: string;

  description: string;

  seatMap: SeatMap;

  language: CategoryLanguage;
}
