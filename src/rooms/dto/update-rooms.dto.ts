import { ApiProperty } from '@nestjs/swagger';
import { Branch } from 'src/branch/entities/branch.entity';

export class UpdateRoomsDto {
  //   @ApiProperty()
  name: string;

  //   @ApiProperty()
  screeningType: string;

  //   @ApiProperty()
  totalSeats: number;

  //   @ApiProperty()
  branch: Branch;
}
