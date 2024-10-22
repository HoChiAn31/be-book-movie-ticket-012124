import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movies.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import { MovieTranslations } from 'src/movie-translations/entities/movie-translations.entity';
import { MovieGenres } from 'src/movie-genres/entities/movie-genres.entity';
import { FilterMoviesDto } from './dto/filter-movie.dto';
import { In } from 'typeorm';
import { UpdateResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(MovieTranslations)
    private readonly movieTranslationsRepository: Repository<MovieTranslations>,
    @InjectRepository(MovieGenres)
    private readonly genreRepository: Repository<MovieGenres>,
  ) {}

  async create(createMovieDto: CreateMoviesDto): Promise<Movie> {
    return await this.moviesRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Create and save Movie entity
        const movie = this.moviesRepository.create(createMovieDto);
        const savedMovie = await transactionalEntityManager.save(Movie, movie);

        // Create and save MovieTranslations entities
        if (
          createMovieDto.translations &&
          createMovieDto.translations.length > 0
        ) {
          const movieTranslations = createMovieDto.translations.map(
            (translation) => ({
              ...translation,
              movie: savedMovie,
              categoryLanguage: { id: translation.categoryLanguageId },
            }),
          );
          await transactionalEntityManager.save(
            MovieTranslations,
            movieTranslations,
          );
        }

        // // Fetch and link movie genres
        // if (createMovieDto.genres && createMovieDto.genres.length > 0) {
        //   const genreIds = createMovieDto.genres.map((genre) => genre.id);
        //   const movieGenres = await transactionalEntityManager.findBy(
        //     MovieGenres,
        //     {
        //       id: In(genreIds),
        //     },
        //   );

        //   if (movieGenres.length !== genreIds.length) {
        //     throw new Error('One or more genre IDs are invalid');
        //   }

        //   savedMovie.genres = movieGenres;
        //   await transactionalEntityManager.save(Movie, savedMovie);
        // }

        // Fetch the saved movie with all relations
        const fullMovie = await transactionalEntityManager.findOne(Movie, {
          where: { id: savedMovie.id },
          relations: ['translations', 'genres'],
        });

        return fullMovie;
      },
    );
  }

  async findAll(query: FilterMoviesDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';

    const [res, total] = await this.moviesRepository.findAndCount({
      where: {
        translations: {
          name: Like('%' + search + '%'),
        },
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,
      relations: {
        translations: {
          categoryLanguage: true,
        },
      },
      select: {
        id: true,
        director: true,
        cast: true,
        releaseDate: true,
        duration: true,
        language: true,
        country: true,
        rating: true,
        poster_url: true,
        trailer_url: true,
        translations: {
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

  async findOne(id: string) {
    return this.moviesRepository.findOne({
      where: { id },
      relations: {
        translations: {
          categoryLanguage: true,
        },
      },
      select: {
        id: true,
        director: true,
        cast: true,
        releaseDate: true,
        duration: true,
        language: true,
        country: true,
        rating: true,
        poster_url: true,
        trailer_url: true,
        translations: {
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
  }

  async update(
    id: string,
    updateMovieDto: UpdateMoviesDto,
  ): Promise<UpdateResult> {
    return this.moviesRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const movie = await transactionalEntityManager.findOne(Movie, {
          where: { id },
          relations: ['translations', 'genres'],
        });

        if (!movie) {
          throw new NotFoundException('Movie not found');
        }

        // Handle translations
        if (updateMovieDto.translations) {
          for (const translationDto of updateMovieDto.translations) {
            await transactionalEntityManager.upsert(
              MovieTranslations,
              { ...translationDto, movie: { id } },
              ['movie', 'categoryLanguage'],
            );
          }
        }

        if (updateMovieDto.genres) {
          const genreIds = updateMovieDto.genres.map(
            (genre) => genre.categoryLanguageId,
          );
          const movieGenres = await transactionalEntityManager.findBy(
            MovieGenres,
            {
              id: In(genreIds),
            },
          );
          movie.genres = movieGenres;
          await transactionalEntityManager.save(Movie, movie);
        }

        const { translations, genres, ...movieUpdateData } = updateMovieDto;

        return transactionalEntityManager.update(Movie, id, movieUpdateData);
      },
    );
  }
  async remove(id: string) {
    return this.moviesRepository.delete(id);
  }
}
