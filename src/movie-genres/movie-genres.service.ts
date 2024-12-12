import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { EntityManager } from 'typeorm';
import { MovieGenres } from './entities/movie-genres.entity';
import { MovieGenreTranslations } from 'src/movie-genres-translations/entities/movie-genres-traslations.entity';
import { FilterMovieGenresDto } from 'src/movie-genres-translations/dto/filter-movie-genres-traslations.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';

@Injectable()
export class MovieGenresService {
  constructor(
    @InjectRepository(MovieGenres)
    private readonly movieGenresRepository: Repository<MovieGenres>,
    @InjectRepository(MovieGenreTranslations)
    private readonly movieGenreTranslationsRepository: Repository<MovieGenreTranslations>,
  ) {}

  async create(movieGenre: MovieGenres): Promise<MovieGenres> {
    return await this.movieGenresRepository.save(movieGenre);
  }

  async findAll(query: FilterMovieGenresDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';

    const [res, total] = await this.movieGenresRepository.findAndCount({
      where: {
        movieGenreTranslation: {
          name: Like('%' + search + '%'),
        },
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,
      relations: {
        movieGenreTranslation: {
          categoryLanguage: true,
        },
      },
      select: {
        id: true,
        numberCategory: true,
        movieGenreTranslation: {
          id: true,
          name: true,
          description: true,
          categoryLanguage: {
            id: true,
            languageCode: true,
          },
        },
        createdAt: true,
        updatedAt: true,
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

  async findOne(id: string): Promise<MovieGenres> {
    return await this.movieGenresRepository.findOne({
      where: { id },
      relations: {
        movieGenreTranslation: {
          categoryLanguage: true,
        },
      },
      select: {
        id: true,
        numberCategory: true,
        movieGenreTranslation: {
          id: true,
          name: true,
          description: true,
          categoryLanguage: {
            // id: true,
            languageCode: true,
          },
        },
        // createdAt: true,
        // updatedAt: true,
      },
    });
  }

  async update(
    id: string,
    movieGenre: UpdateMovieGenreDto,
  ): Promise<UpdateResult> {
    return await this.movieGenresRepository.update(id, movieGenre as any);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.movieGenresRepository.delete({ id });
  }

  async createMovieGenreWithTranslation(
    createMovieGenreDto: CreateMovieGenreDto,
  ): Promise<MovieGenres> {
    return await this.movieGenresRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Create and save MovieGenre entity
        const movieGenre = this.movieGenresRepository.create({
          numberCategory: createMovieGenreDto.numberCategory,
        });

        const savedMovieGenre =
          await transactionalEntityManager.save(movieGenre);

        // Create and save MovieGenreTranslations entities
        const movieGenreTranslations =
          createMovieGenreDto.movieGenreTranslation.map((translation) => {
            return this.movieGenreTranslationsRepository.create({
              ...translation,
              movieGenres: savedMovieGenre,
              categoryLanguage: { id: translation.categoryLanguageId },
            });
          });

        await transactionalEntityManager.save(movieGenreTranslations);

        // Return the saved MovieGenre entity
        return savedMovieGenre;
      },
    );
  }
}
