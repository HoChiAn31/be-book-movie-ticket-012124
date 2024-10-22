import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeatMap } from './entities/seat-maps.entity';
import { Like, Repository } from 'typeorm';
import { CreateSeatMapDto } from './dto/create-seat-maps.dto';
import { FilterSeatMapsDto } from './dto/filter-seat-maps.dto';

@Injectable()
export class SeatMapsService {
  constructor(
    @InjectRepository(SeatMap)
    private readonly seatMapRepository: Repository<SeatMap>,
  ) {}

  async create(createSeatMapDto: CreateSeatMapDto): Promise<SeatMap> {
    const seatMap = this.seatMapRepository.create(createSeatMapDto);
    return this.seatMapRepository.save(seatMap);
  }

  async findAll(query: FilterSeatMapsDto): Promise<any> {
    const itemsPerPage = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemsPerPage;
    const search = query.search || '';

    const [res, total] = await this.seatMapRepository.findAndCount({
      //   where: { name: Like('%' + search + '%') },
      order: { createdAt: 'DESC' },
      take: itemsPerPage,
      skip: skip,
      relations: {
        translations: {
          categoryLanguage: true,
        },
      },
      select: {
        id: true,
        row: true,
        count: true,
        createdAt: true,
        updatedAt: true,
        translations: {
          id: true,
          type: true,
          description: true,
          categoryLanguage: {
            id: true,
            languageCode: true,
          },
        },
      },
    });

    const lastPage = Math.ceil(total / itemsPerPage);
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

  async findOne(id: string): Promise<SeatMap> {
    return this.seatMapRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateSeatMapDto: CreateSeatMapDto,
  ): Promise<SeatMap> {
    const seatMap = await this.seatMapRepository.findOne({ where: { id } });
    if (!seatMap) {
      throw new NotFoundException('SeatMap not found');
    }
    return this.seatMapRepository.save({ ...seatMap, ...updateSeatMapDto });
  }

  async remove(id: string): Promise<void> {
    await this.seatMapRepository.delete(id);
  }
}
