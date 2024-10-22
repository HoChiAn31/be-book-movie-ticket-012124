import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookings } from './entites/bookings.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreateBookingDto } from './dto/create-bookings.dto';
import { UpdateBookingDto } from './dto/update-bookings.dto';
import { FilterBookingsDto } from './dto/filter-bookings.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Bookings)
    private readonly bookingsRepository: Repository<Bookings>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Bookings> {
    const booking = this.bookingsRepository.create(createBookingDto);
    return this.bookingsRepository.save(booking);
  }

  async findAll(query: FilterBookingsDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const [res, total] = await this.bookingsRepository.findAndCount({
      //   where: [{ : Like('%' + keyword + '%') }],
      relations: {
        user: true,
        bookingDetails: true,
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,

      select: {
        id: true,
        totalTickets: true,
        totalAmount: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
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
  async findOne(id: string): Promise<Bookings> {
    return this.bookingsRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<UpdateResult> {
    return this.bookingsRepository.update(id, updateBookingDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.bookingsRepository.delete(id);
  }
}
