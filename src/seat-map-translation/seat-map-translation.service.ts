import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeatMapTranslation } from './entities/seat-map-translation.entity';
import { Like, Repository } from 'typeorm';
import { CreateSeatMapTranslationDto } from './dto/create-seat-map-translation.dto';
import { FilterSeatMapTranslationsDto } from './dto/filter-seat-maps-translation.dto';

@Injectable()
export class SeatMapTranslationService {
  constructor(
    @InjectRepository(SeatMapTranslation)
    private readonly seatMapTranslationRepository: Repository<SeatMapTranslation>,
  ) {}

  async create(createSeatMapTranslationDto: CreateSeatMapTranslationDto) {
    const seatMapTranslation = this.seatMapTranslationRepository.create(
      createSeatMapTranslationDto,
    );
    return this.seatMapTranslationRepository.save(seatMapTranslation);
  }

  async findAll(query: FilterSeatMapTranslationsDto): Promise<any> {
    const itemsPerPage = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemsPerPage;
    const search = query.search || '';
    const categoryLanguage = query.categoryLanguage || '';

    const [rooms, total] = await this.seatMapTranslationRepository.findAndCount(
      {
        where: {
          type: Like('%' + search + '%'),
          categoryLanguage: {
            languageCode: Like('%' + categoryLanguage + '%'),
          },
        },
        order: { createdAt: 'DESC' },
        take: itemsPerPage,
        skip: skip,
        relations: {
          seatMap: true,
          categoryLanguage: true,
        },
        select: {
          id: true,
          type: true,
          createdAt: true,
          updatedAt: true,
          seatMap: {
            id: true,
            row: true,
            count: true,
          },
          categoryLanguage: {
            id: true,
            languageCode: true,
          },
        },
      },
    );

    const lastPage = Math.ceil(total / itemsPerPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: rooms,
      total,
      currentPage: page,
      lastPage,
      nextPage,
      prevPage,
    };
  }

  async findOne(id: string) {
    return this.seatMapTranslationRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateSeatMapTranslationDto: CreateSeatMapTranslationDto,
  ) {
    return this.seatMapTranslationRepository.update(
      id,
      updateSeatMapTranslationDto,
    );
  }

  async delete(id: string) {
    return this.seatMapTranslationRepository.delete(id);
  }
}
