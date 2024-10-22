import { ApiProperty } from '@nestjs/swagger';
import { Branch } from 'src/branch/entities/branch.entity';

export class CreateRoomsDto {
  //   @ApiProperty()
  name: string;

  //   @ApiProperty()
  screeningType: string;

  //   @ApiProperty()
  totalSeats: number;

  //   @ApiProperty()
  branch: Branch;
}
