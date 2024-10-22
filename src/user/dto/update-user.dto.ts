import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: string;
}
