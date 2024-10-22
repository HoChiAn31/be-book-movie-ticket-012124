import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookingDetails } from './entities/booking-details.entity';
import { CreateBookingDetailsDto } from './dto/create-booking-details.dto';
import { FilterBookingDetailsDto } from './dto/filter-booking-details.dto';
import { UpdateBookingDetailsDto } from './dto/update-booking-details.dto';
import { Bookings } from 'src/bookings/entites/bookings.entity';
import { Tickets } from 'src/tickets/entities/tickets.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookingDetailsService {
  constructor(
    @InjectRepository(BookingDetails)
    private readonly bookingDetailsRepository: Repository<BookingDetails>,
  ) {}

  async create(createBookingDetailsDto: CreateBookingDetailsDto) {
    const bookingDetails = this.bookingDetailsRepository.create(
      createBookingDetailsDto,
    );
    return this.bookingDetailsRepository.save(bookingDetails);
  }

  async findAll(query: FilterBookingDetailsDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const [res, total] = await this.bookingDetailsRepository.findAndCount({
      //   where: [{ : Like('%' + keyword + '%') }],
      relations: {
        booking: true,
        tickets: true,
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,

      select: {
        id: true,
        seatNumber: true,
        price: true,
        quantity: true,
        createdAt: true,
        updatedAt: true,
        booking: {
          id: true,
          totalTickets: true,
          totalAmount: true,
        },
        tickets: {
          id: true,

          ticketType: true,
          ticketPrice: true,
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
    return this.bookingDetailsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateBookingDetailsDto: UpdateBookingDetailsDto) {
    return this.bookingDetailsRepository.update(id, updateBookingDetailsDto);
  }

  async remove(id: string) {
    return this.bookingDetailsRepository.delete(id);
  }
}
