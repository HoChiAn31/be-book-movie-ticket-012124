import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import { FilterMoviesDto } from './dto/filter-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { FilterSelectMoviesDto } from './dto/filter-select-movie.dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('poster_url'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMovieDto: CreateMoviesDto,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    // Validate file type
    const validImageTypes = ['.jpg', '.jpeg', '.png', '.webp']; // Add more types as needed
    const fileExtension = extname(file.originalname).toLowerCase();

    if (!validImageTypes.includes(fileExtension)) {
      throw new BadRequestException(
        'Only .jpg, .jpeg, and .png files are allowed',
      );
    }

    const posterUrl = await this.moviesService.uploadImage(file);
    createMovieDto.poster_url = posterUrl;

    const parsedTranslations = createMovieDto.translations.map((translation) =>
      typeof translation === 'string' ? JSON.parse(translation) : translation,
    );
    createMovieDto.translations = parsedTranslations;

    const parsedGenres = createMovieDto.genres.map((genre) =>
      typeof genre === 'string' ? JSON.parse(genre) : genre,
    );
    createMovieDto.genres = parsedGenres;

    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(@Query() query: FilterMoviesDto) {
    return this.moviesService.findAll(query);
  }
  @Get('/findAllName')
  findAllName(@Query() query: FilterMoviesDto) {
    return this.moviesService.findAllName(query);
  }

  @Get('/findAllRevenue')
  findAllRevenue(@Query() query: FilterSelectMoviesDto) {
    return this.moviesService.findAllRevenue(query);
  }
  @Get('/showtimes')
  findAllShowTimes(@Query() query: FilterMoviesDto) {
    return this.moviesService.findAllShowTimes(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Get('/findOneSelect/:id')
  findOneSelect(
    @Param('id') id: string,
    @Query() query: FilterSelectMoviesDto,
  ) {
    return this.moviesService.findOneSelect(id, query);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMoviesDto) {
    return this.moviesService.update(id, updateMovieDto);
  }
  @Patch(':id')
  updatePatch(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMoviesDto,
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
