import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { FilterRoomsDto } from './dto/filter-rooms.dto';
import { CreateRoomsDto } from './dto/create-rooms.dto';
import { Room } from './entities/rooms.entity';
import { UpdateRoomsDto } from './dto/update-rooms.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll(@Query() query: FilterRoomsDto): Promise<any> {
    return this.roomsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Get('branch/:branchId')
  async findByBranch(
    @Param('branchId') branchId: string,
    @Query() query: FilterRoomsDto,
  ) {
    return this.roomsService.findByBranch(branchId, query);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomsDto: Partial<UpdateRoomsDto>,
  ): Promise<Room> {
    return this.roomsService.update(id, updateRoomsDto);
  }
}
