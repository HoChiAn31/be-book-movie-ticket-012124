import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FilterSeatMapsDto } from './dto/filter-seat-maps.dto';
import { CreateSeatMapDto } from './dto/create-seat-maps.dto';
import { SeatMapsService } from './seat-maps.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seat Maps')
@Controller('seat-maps')
export class SeatMapsController {
  constructor(private readonly seatMapService: SeatMapsService) {}

  @Get()
  async findAll(@Query() filterSeatMapDto: FilterSeatMapsDto) {
    return this.seatMapService.findAll(filterSeatMapDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.seatMapService.findOne(id);
  }

  @Post()
  async create(@Body() createSeatMapDto: CreateSeatMapDto) {
    return this.seatMapService.create(createSeatMapDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSeatMapDto: CreateSeatMapDto,
  ) {
    return this.seatMapService.update(id, updateSeatMapDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.seatMapService.remove(id);
  }
}
