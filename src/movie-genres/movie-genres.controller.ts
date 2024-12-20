import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { MovieGenresService } from './movie-genres.service';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { FilterMovieGenresDto } from 'src/movie-genres-translations/dto/filter-movie-genres-traslations.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Movie Genres')
@Controller('movie-genres')
export class MovieGenresController {
  constructor(private readonly movieGenresService: MovieGenresService) {}

  @Post()
  @ApiBody({
    description: 'JSON format for creating a movie genre with translations',
    schema: {
      type: 'object',
      properties: {
        numberCategory: { type: 'number', example: 104 },
        movieGenreTranslation: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              categoryLanguageId: {
                type: 'string',
                example: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
              },
              name: {
                type: 'string',
                example: 'Fantasy',
              },
              description: {
                type: 'string',
                example: 'Fantasy',
              },
            },
          },
        },
      },
      example: {
        numberCategory: 104,
        movieGenreTranslation: [
          {
            categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
            name: 'Fantasy',
            description: 'Fantasy',
          },
          {
            categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
            name: 'Viễn tưởng',
            description: 'Viễn tưởng',
          },
        ],
      },
    },
  })
  async create(@Body() createMovieGenreDto: CreateMovieGenreDto) {
    return await this.movieGenresService.createMovieGenreWithTranslation(
      createMovieGenreDto,
    );
  }

  @Get()
  async findAll(@Query() query: FilterMovieGenresDto) {
    return await this.movieGenresService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.movieGenresService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieGenreDto: UpdateMovieGenreDto,
  ) {
    return await this.movieGenresService.updateMovieGenreWithTranslation(
      id,
      updateMovieGenreDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.movieGenresService.remove(id);
  }
}
