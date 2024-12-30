import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  EntityManager,
  Like,
  DeleteResult,
  UpdateResult,
} from 'typeorm';
import { ShowTimes } from './entities/show-times.entity';
import { CreateShowTimesDto } from './dto/create-show-times.dto';
import { Movie } from 'src/movies/entities/movies.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { Room } from 'src/rooms/entities/rooms.entity';
import { UpdateShowTimesDto } from './dto/update-show-times.dto';
import { FilterShowTimesDto } from './dto/filter-show-times.dto';

@Injectable()
export class ShowTimesService {
  constructor(
    @InjectRepository(ShowTimes)
    private showTimesRepository: Repository<ShowTimes>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createShowTimesDto: CreateShowTimesDto): Promise<ShowTimes> {
    return this.showTimesRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const movie = await transactionalEntityManager.findOne(Movie, {
          where: { id: createShowTimesDto.movieId },
        });
        if (!movie)
          throw new NotFoundException(
            `Movie with ID ${createShowTimesDto.movieId} not found`,
          );

        const room = await transactionalEntityManager.findOne(Room, {
          where: { id: createShowTimesDto.roomId },
        });
        if (!room)
          throw new NotFoundException(
            `Room with ID ${createShowTimesDto.roomId} not found`,
          );

        const showTimes = this.showTimesRepository.create({
          ...createShowTimesDto,
          movie,
          room,
        });

        const savedShowTimes = await transactionalEntityManager.save(
          ShowTimes,
          showTimes,
        );

        return transactionalEntityManager.findOne(ShowTimes, {
          where: { id: savedShowTimes.id },
          relations: ['movie', 'room'],
        });
      },
    );
  }

  async findAll(query: FilterShowTimesDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';

    const [res, total] = await this.showTimesRepository.findAndCount({
      where: {
        movie: {
          translations: {
            name: Like('%' + search + '%'),
          },
        },
      },
      order: { created_at: 'DESC' },
      take: items_per_page,
      skip: skip,
      relations: {
        movie: {
          translations: {
            categoryLanguage: true,
          },
        },

        room: {
          branch: {
            translations: {
              categoryLanguage: true,
            },
          },
        },
        tickets: true,
      },
      select: {
        id: true,
        price: true,
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

        room: {
          id: true,
          name: true,
          totalSeats: true,
          branch: {
            id: true,
            phone: true,
            translations: {
              id: true,
              languageCode: true,
              name: true,
              categoryLanguage: {
                languageCode: true,
              },
            },
          },
        },
        tickets: {
          id: true,
          ticketType: true,
          ticketPrice: true,
        },
        created_at: true,
        updated_at: true,
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

  async findOne(id: string): Promise<ShowTimes | null> {
    const showTime = await this.showTimesRepository.findOne({
      where: { id },
      relations: {
        movie: {
          translations: {
            categoryLanguage: true,
          },
        },
        room: {
          branch: {
            translations: {
              categoryLanguage: true,
            },
          },
        },
        tickets: true,
      },
      select: {
        id: true,
        price: true,
        show_time_start: true,
        show_time_end: true,
        movie: {
          id: true,
          duration: true,
          translations: {
            id: true,
            name: true,
            categoryLanguage: {
              languageCode: true,
            },
          },
        },
        room: {
          id: true,
          name: true,
          totalSeats: true,
          branch: {
            id: true,
            phone: true,
            translations: {
              id: true,
              languageCode: true,
              name: true,
              categoryLanguage: {
                languageCode: true,
              },
            },
          },
        },
        tickets: {
          id: true,
          ticketType: true,
          ticketPrice: true,
        },
        created_at: true,
        updated_at: true,
      },
    });

    return showTime || null;
  }
  async update(
    id: string,
    updateShowTimesDto: UpdateShowTimesDto,
  ): Promise<ShowTimes> {
    const showTime = await this.showTimesRepository.findOne({
      where: { id },
      relations: ['room', 'movie'],
    });
    if (!showTime)
      throw new NotFoundException(`ShowTime with ID ${id} not found`);

    if (updateShowTimesDto.roomId) {
      const room = await this.roomRepository.findOne({
        where: { id: updateShowTimesDto.roomId },
      });
      if (!room)
        throw new NotFoundException(
          `Room with ID ${updateShowTimesDto.roomId} not found`,
        );
      showTime.room = room;
    }

    if (updateShowTimesDto.movieId) {
      const movie = await this.movieRepository.findOne({
        where: { id: updateShowTimesDto.movieId },
      });
      if (!movie)
        throw new NotFoundException(
          `Movie with ID ${updateShowTimesDto.movieId} not found`,
        );
      showTime.movie = movie;
    }

    Object.assign(showTime, updateShowTimesDto);
    return this.showTimesRepository.save(showTime);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.showTimesRepository.delete(id);
  }
}
