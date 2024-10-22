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
import { MovieTranslationsService } from './movie-translations.service';
import { FilterMovieTranslationsDto } from './dto/filter-movie-traslations.dto';
import { MovieTranslations } from './entities/movie-translations.entity';
import { CreateMovieTranslationsDto } from './dto/create-movie-translations.dto';
import { UpdateMovieTranslationsDto } from './dto/update-movie-translations.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movie Translations')
@Controller('movie-translations')
export class MovieTranslationsController {
  constructor(
    private readonly movieTranslationsService: MovieTranslationsService,
  ) {}

  @Get()
  async findAll(
    @Query() query: FilterMovieTranslationsDto,
  ): Promise<MovieTranslations[]> {
    return this.movieTranslationsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MovieTranslations> {
    return this.movieTranslationsService.findOne(id);
  }

  @Post()
  async create(
    @Body() createMovieTranslationDto: CreateMovieTranslationsDto,
  ): Promise<MovieTranslations> {
    return this.movieTranslationsService.create(createMovieTranslationDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieTranslationDto: UpdateMovieTranslationsDto,
  ): Promise<UpdateResult> {
    return this.movieTranslationsService.update(id, updateMovieTranslationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.movieTranslationsService.remove(id);
  }
}
