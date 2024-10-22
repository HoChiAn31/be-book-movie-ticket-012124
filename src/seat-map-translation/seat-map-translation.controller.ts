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
import { SeatMapTranslationService } from './seat-map-translation.service';
import { FilterSeatMapTranslationsDto } from './dto/filter-seat-maps-translation.dto';
import { CreateSeatMapTranslationDto } from './dto/create-seat-map-translation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seat Map Translation')
@Controller('seat-map-translation')
export class SeatMapTranslationController {
  constructor(
    private readonly seatMapTranslationService: SeatMapTranslationService,
  ) {}

  @Get()
  async findAll(@Query() query: FilterSeatMapTranslationsDto) {
    return this.seatMapTranslationService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.seatMapTranslationService.findOne(id);
  }

  @Post()
  async create(
    @Body() createSeatMapTranslationDto: CreateSeatMapTranslationDto,
  ) {
    return this.seatMapTranslationService.create(createSeatMapTranslationDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSeatMapTranslationDto: CreateSeatMapTranslationDto,
  ) {
    return this.seatMapTranslationService.update(
      id,
      updateSeatMapTranslationDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.seatMapTranslationService.delete(id);
  }
}
