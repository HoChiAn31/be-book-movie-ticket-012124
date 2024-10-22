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
import { MoviesService } from './movies.service';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import { FilterMoviesDto } from './dto/filter-movie.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMoviesDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(@Query() query: FilterMoviesDto) {
    return this.moviesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMoviesDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
