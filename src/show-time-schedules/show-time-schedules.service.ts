import { Injectable, NotFoundException } from '@nestjs/common';
import { ShowTimeSchedules } from './entities/show-time-schedules.entity';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movies.entity';
import { CreateShowTimeSchedulessDto } from './dto/create-show-time-schedules.dto';
import { FilterShowTimeSchedulesDto } from './dto/filter-show-time-schedules.dto';
import { UpdateShowTimeSchedulessDto } from './dto/update-show-time-schedules.dto';

@Injectable()
export class ShowTimeSchedulesService {
  constructor(
    @InjectRepository(ShowTimeSchedules)
    private showTimeSchedulesRepository: Repository<ShowTimeSchedules>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}
  async create(
    createShowTimeSchedulesDto: CreateShowTimeSchedulessDto,
  ): Promise<ShowTimeSchedules> {
    return this.showTimeSchedulesRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const movie = await transactionalEntityManager.findOne(Movie, {
          where: { id: createShowTimeSchedulesDto.movieId },
        });
        if (!movie)
          throw new NotFoundException(
            `Movie with ID ${createShowTimeSchedulesDto.movieId} not found`,
          );

        const showTimeSchedules = this.showTimeSchedulesRepository.create({
          ...createShowTimeSchedulesDto,
          movie,
        });

        const savedShowTimeSchedules = await transactionalEntityManager.save(
          ShowTimeSchedules,
          showTimeSchedules,
        );

        return transactionalEntityManager.findOne(ShowTimeSchedules, {
          where: { id: savedShowTimeSchedules.id },
          relations: ['movie'],
        });
      },
    );
  }
  async findAll(query: FilterShowTimeSchedulesDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';

    const [res, total] = await this.showTimeSchedulesRepository.findAndCount({
      where: {
        movie: true,
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,
      relations: {
        movie: {
          translations: {
            categoryLanguage: true,
          },
        },
      },
      select: {
        id: true,

        show_time_start: true,
        show_time_end: true,
        movie: {
          id: true,
          translations: {
            id: true,
            name: true,
            categoryLanguage: {
              languageCode: true,
            },
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

  async findOne(id: string): Promise<ShowTimeSchedules> {
    return await this.showTimeSchedulesRepository.findOne({
      where: { id },
      relations: {
        movie: {
          translations: {
            categoryLanguage: true,
          },
        },
      },
      select: {
        id: true,

        show_time_start: true,
        show_time_end: true,
        movie: {
          id: true,
          translations: {
            id: true,
            name: true,
            categoryLanguage: {
              languageCode: true,
            },
          },
        },

        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async update(
    id: string,
    updateShowTimesDto: UpdateShowTimeSchedulessDto,
  ): Promise<ShowTimeSchedules> {
    const showTime = await this.showTimeSchedulesRepository.findOne({
      where: { id },
    });

    if (!showTime) {
      throw new NotFoundException(`Show Time with ID "${id}" not found`);
    }

    // Thực hiện cập nhật
    await this.showTimeSchedulesRepository.update(id, updateShowTimesDto);

    // Lấy lại bản ghi đã cập nhật.
    const updatedShowTime = await this.showTimeSchedulesRepository.findOne({
      where: { id },
    });

    if (!updatedShowTime) {
      throw new NotFoundException(
        `Updated Show Time with ID "${id}" not found`,
      );
    }

    return updatedShowTime;
  }
  async remove(id: string): Promise<DeleteResult> {
    return await this.showTimeSchedulesRepository.delete(id);
  }
}
