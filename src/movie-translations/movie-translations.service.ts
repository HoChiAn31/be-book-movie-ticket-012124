import { Injectable } from '@nestjs/common';
import { MovieTranslations } from './entities/movie-translations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreateMovieTranslationsDto } from './dto/create-movie-translations.dto';
import { UpdateMovieTranslationsDto } from './dto/update-movie-translations.dto';
import { FilterMovieTranslationsDto } from './dto/filter-movie-traslations.dto';

@Injectable()
export class MovieTranslationsService {
  constructor(
    @InjectRepository(MovieTranslations)
    private readonly movieTranslationsRepository: Repository<MovieTranslations>,
  ) {}

  async create(createMovieTranslationsDto: CreateMovieTranslationsDto) {
    const movieTranslations = this.movieTranslationsRepository.create(
      createMovieTranslationsDto,
    );
    return this.movieTranslationsRepository.save(movieTranslations);
  }

  async findAll(query: FilterMovieTranslationsDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';
    const categoryLanguage = query.categoryLanguage || '';

    const [res, total] = await this.movieTranslationsRepository.findAndCount({
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
        movie: true,
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

  async findOne(id: string) {
    return this.movieTranslationsRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateMovieTranslationsDto: UpdateMovieTranslationsDto,
  ): Promise<UpdateResult> {
    // console.log(id, updateMovieTranslationsDto);
    return this.movieTranslationsRepository.update(
      id,
      updateMovieTranslationsDto,
    );
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.movieTranslationsRepository.delete(id);
  }
}
