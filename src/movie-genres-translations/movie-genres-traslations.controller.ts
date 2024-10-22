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
import { CreateMovieGenresDto } from './dto/create-movie-genres-traslations.dto';
import { MovieGenreTranslations } from './entities/movie-genres-traslations.entity';
import { FilterMovieGenresDto } from './dto/filter-movie-genres-traslations.dto';
import { MovieGenresTranslationService } from './movie-genres-traslations.service';
import { DeleteResult } from 'typeorm';
import { UpdateMovieGenresDto } from './dto/update-movie-genres-traslations.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movie Genre Translations')
@Controller('movie-genre-translations')
export class MovieGenreTraslationsController {
  constructor(
    private movieGenreTranslationsService: MovieGenresTranslationService,
  ) {}

  @Post()
  create(
    @Body() createMovieGenresDto: CreateMovieGenresDto,
  ): Promise<MovieGenreTranslations> {
    return this.movieGenreTranslationsService.create(createMovieGenresDto);
  }

  @Get()
  findAll(@Query() query: FilterMovieGenresDto): Promise<any> {
    return this.movieGenreTranslationsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<MovieGenreTranslations> {
    return this.movieGenreTranslationsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieGenresDto: UpdateMovieGenresDto,
  ): Promise<MovieGenreTranslations> {
    return this.movieGenreTranslationsService.update(id, updateMovieGenresDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.movieGenreTranslationsService.remove(id);
  }
}
