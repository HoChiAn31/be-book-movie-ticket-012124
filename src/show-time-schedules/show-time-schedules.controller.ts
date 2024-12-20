import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { ShowTimeSchedulesService } from './show-time-schedules.service';
import { CreateShowTimeSchedulessDto } from './dto/create-show-time-schedules.dto';
import { FilterShowTimeSchedulesDto } from './dto/filter-show-time-schedules.dto';
import { UpdateShowTimeSchedulessDto } from './dto/update-show-time-schedules.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Show times Schedules')
@Controller('show-time-schedules')
export class ShowTimeSchedulesController {
  constructor(
    private readonly showTimeSchedulesService: ShowTimeSchedulesService,
  ) {}

  @Post()
  async create(
    @Body() createShowTimeSchedulesDto: CreateShowTimeSchedulessDto,
  ) {
    return this.showTimeSchedulesService.create(createShowTimeSchedulesDto);
  }

  @Get()
  async findAll(@Query() query: FilterShowTimeSchedulesDto) {
    return this.showTimeSchedulesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.showTimeSchedulesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShowTimeSchedulesDto: UpdateShowTimeSchedulessDto,
  ) {
    return this.showTimeSchedulesService.update(id, updateShowTimeSchedulesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.showTimeSchedulesService.remove(id);
  }
}
