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
import { ShowTimesService } from './show-times.service';
import { CreateShowTimesDto } from './dto/create-show-times.dto';
import { UpdateShowTimesDto } from './dto/update-show-times.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Show times')
@Controller('show-times')
export class ShowTimesController {
  constructor(private readonly showTimesService: ShowTimesService) {}

  @Post()
  create(@Body() createShowTimesDto: CreateShowTimesDto) {
    return this.showTimesService.create(createShowTimesDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.showTimesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showTimesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateShowTimesDto: UpdateShowTimesDto,
  ) {
    return this.showTimesService.update(id, updateShowTimesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showTimesService.remove(id);
  }
}
