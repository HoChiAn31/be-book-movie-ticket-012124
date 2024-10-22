import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieGenreTranslations } from './entities/movie-genres-traslations.entity';
import { DeleteResult, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { CreateMovieGenresDto } from './dto/create-movie-genres-traslations.dto';
import { FilterMovieGenresDto } from './dto/filter-movie-genres-traslations.dto';
import { UpdateMovieGenresDto } from './dto/update-movie-genres-traslations.dto';

@Injectable()
export class MovieGenresTranslationService {
  constructor(
    @InjectRepository(MovieGenreTranslations)
    private readonly movieGenresRepository: Repository<MovieGenreTranslations>,
    @InjectRepository(CategoryLanguage)
    private readonly categoryLanguageRepository: Repository<CategoryLanguage>,
  ) {}

  async create(
    createMovieGenresDto: CreateMovieGenresDto,
  ): Promise<MovieGenreTranslations> {
    return await this.movieGenresRepository.save(createMovieGenresDto);
  }

  async findAll(query: FilterMovieGenresDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';
    const categoryLanguage = query.categoryLanguage || '';

    const [res, total] = await this.movieGenresRepository.findAndCount({
      where: {
        name: Like('%' + search + '%'),
        categoryLanguage: {
          languageCode: Like('%' + categoryLanguage + '%'),
        },
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,
      relations: {
        categoryLanguage: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        categoryLanguage: {
          id: true,
          name: true,
          languageCode: true,
        },
      },
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      data: res,
      total,
      currentPage: page,
      lastPage,
      nextPage,
      prevPage,
    };
  }
  async findOne(id: string): Promise<MovieGenreTranslations> {
    const movieGenres = await this.movieGenresRepository.findOne({
      where: { id },
      relations: {
        categoryLanguage: true,
      },
    });
    if (!movieGenres) {
      throw new NotFoundException(`Movie genres with ID "${id}" not found`);
    }
    return movieGenres;
  }

  async update(
    id: string,
    updateMovieGenresDto: UpdateMovieGenresDto,
  ): Promise<MovieGenreTranslations> {
    const movieGenres = await this.movieGenresRepository.findOne({
      where: { id },
    });
    if (!movieGenres) {
      throw new NotFoundException(`Movie genres with ID "${id}" not found`);
    }
    return await this.movieGenresRepository.save(updateMovieGenresDto);
  }
  async remove(id: string): Promise<DeleteResult> {
    return await this.movieGenresRepository.delete(id);
  }
}
