import { Injectable, Inject } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { BookingDetails } from './entities/booking-details.entity';
import { CreateBookingDetailsDto } from './dto/create-booking-details.dto';
import { FilterBookingDetailsDto } from './dto/filter-booking-details.dto';
import { UpdateBookingDetailsDto } from './dto/update-booking-details.dto';
import { Bookings } from 'src/bookings/entites/bookings.entity';
import { Tickets } from 'src/tickets/entities/tickets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodDrinkBooks } from 'src/food-drink-books/entities/foodDrink-books.entity';

@Injectable()
export class BookingDetailsService {
  constructor(
    @InjectRepository(BookingDetails)
    private readonly bookingDetailsRepository: Repository<BookingDetails>,
    @InjectRepository(Bookings)
    private readonly bookingsRepository: Repository<Bookings>,
    @InjectRepository(Tickets)
    private readonly ticketsRepository: Repository<Tickets>,

    @InjectRepository(FoodDrinkBooks)
    private readonly foodDrinkBooksRepository: Repository<FoodDrinkBooks>,
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
      //   where: [{ : Like('%' + keyword + '%') }]
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

        createdAt: true,
        updatedAt: true,
        // booking: {
        //   id: true,
        //   totalTickets: true,
        //   totalAmount: true,
        // },
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

  async updateP(id: string, updateBookingDetailsDto: UpdateBookingDetailsDto) {
    // Tìm BookingDetails hiện tại
    const bookingDetails = await this.bookingDetailsRepository.findOne({
      where: { id },
      relations: ['foodDrinks', 'tickets'], // Load các mối quan hệ cần thiết
    });

    if (!bookingDetails) {
      throw new Error('BookingDetails not found');
    }

    // Cập nhật các trường của BookingDetails
    bookingDetails.seatNumber =
      updateBookingDetailsDto.seatNumber || bookingDetails.seatNumber;

    // Cập nhật tickets nếu có
    if (updateBookingDetailsDto.tickets) {
      const tickets = await this.ticketsRepository.find({
        where: {
          id: In(updateBookingDetailsDto.tickets.map((ticket) => ticket.id)),
        },
      });
      bookingDetails.tickets = tickets; // Gán lại mảng tickets
    }

    // Cập nhật foodDrinks nếu có
    if (updateBookingDetailsDto.foodDrinks) {
      const foodDrinks = await this.foodDrinkBooksRepository.find({
        where: {
          id: In(updateBookingDetailsDto.foodDrinks.map((fd) => fd.id)),
        },
      });
      bookingDetails.foodDrinks = foodDrinks; // Gán lại mảng foodDrinks
    }

    // Lưu lại các thay đổi
    return this.bookingDetailsRepository.save(bookingDetails);
  }
  async remove(id: string) {
    return this.bookingDetailsRepository.delete(id);
  }
}
