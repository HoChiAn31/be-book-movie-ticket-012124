import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookings } from './entites/bookings.entity';
import { DeleteResult, Equal, Like, Repository, UpdateResult } from 'typeorm';
import { CreateBookingDto } from './dto/create-bookings.dto';
import { UpdateBookingDto } from './dto/update-bookings.dto';
import { FilterBookingsDto } from './dto/filter-bookings.dto';
import { FoodDrinkBooks } from 'src/food-drink-books/entities/foodDrink-books.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { BookingDetails } from 'src/booking-details/entities/booking-details.entity';
import { Tickets } from 'src/tickets/entities/tickets.entity';
import { CreateBookingRequestDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Bookings)
    private readonly bookingsRepository: Repository<Bookings>,
    @InjectRepository(FoodDrinkBooks)
    private foodDrinkBooksRepository: Repository<FoodDrinkBooks>,
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    @InjectRepository(BookingDetails)
    private bookingDetailsRepository: Repository<BookingDetails>,
    // @InjectRepository(BookingDetails)
    // private bookingRepository: Repository<BookingDetails>,
    @InjectRepository(Tickets) private ticketRepository: Repository<Tickets>,
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
    const languageCode = query.languageCode || 'vi';
    const [res, total] = await this.bookingsRepository.findAndCount({
      where: {
        bookingDetails: {
          tickets: true,
          foodDrinks: {
            foodDrinks: {
              translations: {
                categoryLanguage: {
                  languageCode: Equal(languageCode),
                },
              },
            },
          },
        },
        movie: {
          translations: {
            name: Like(`%${keyword}%`),
            categoryLanguage: {
              languageCode: Equal(languageCode),
            },
          },
        },
        showTimes: {
          room: {
            branch: {
              translations: {
                languageCode: Equal(languageCode),
              },
            },
          },
        },
      },
      relations: {
        user: true,
        bookingDetails: {
          tickets: true,
          foodDrinks: {
            foodDrinks: {
              translations: {
                categoryLanguage: true,
              },
            },
          },
        },
        movie: {
          translations: {
            categoryLanguage: true,
          },
        },

        payment: true,
        showTimes: {
          room: {
            branch: {
              translations: true,
            },
          },
        },
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,

      select: {
        id: true,
        totalTickets: true,
        totalAmount: true,
        createdAt: true,
        user: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
        bookingDetails: {
          id: true,
          seatNumber: true,
          tickets: {
            id: true,
            ticketType: true,
            quantity: true,
            ticketPrice: true,
          },
          foodDrinks: {
            id: true,
            quantity: true,
            price: true,
            foodDrinks: {
              id: true,
              translations: {
                name: true,
                categoryLanguage: {
                  languageCode: true,
                },
              },
            },
          },
        },
        movie: {
          id: true,
          director: true,
          poster_url: true,
          trailer_url: true,
          translations: {
            name: true,
            categoryLanguage: {
              languageCode: true,
            },
          },
        },
        showTimes: {
          id: true,
          show_time_start: true,
          show_time_end: true,
          room: {
            id: true,
            name: true,
            branch: {
              id: true,
              translations: {
                id: true,
                name: true,
                address: true,
                languageCode: true,
              },
            },
          },
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

  async findAllRevenue(query: FilterBookingsDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const languageCode = query.languageCode || 'vi';
    const [res, total] = await this.bookingsRepository.findAndCount({
      where: {
        bookingDetails: {
          tickets: true,
          foodDrinks: {
            foodDrinks: {
              translations: {
                categoryLanguage: {
                  languageCode: Equal(languageCode),
                },
              },
            },
          },
        },
        movie: {
          translations: {
            name: Like(`%${keyword}%`),
            categoryLanguage: {
              languageCode: Equal(languageCode),
            },
          },
        },
        showTimes: {
          room: {
            branch: {
              translations: {
                languageCode: Equal(languageCode),
              },
            },
          },
        },
      },
      relations: {
        bookingDetails: {
          tickets: true,
        },
        movie: {
          translations: {
            categoryLanguage: true,
          },
        },

        showTimes: {
          room: {
            branch: {
              translations: true,
            },
          },
        },
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,

      select: {
        id: true,
        totalTickets: true,
        // totalAmount: true,
        createdAt: true,

        bookingDetails: {
          id: true,
          seatNumber: true,
          tickets: {
            id: true,
            ticketType: true,
            quantity: true,
            ticketPrice: true,
          },
        },
        movie: {
          id: true,
          director: true,
          poster_url: true,
          trailer_url: true,
          translations: {
            name: true,
            categoryLanguage: {
              languageCode: true,
            },
          },
        },
        showTimes: {
          id: true,
          show_time_start: true,
          show_time_end: true,
          room: {
            id: true,
            name: true,
            branch: {
              id: true,
              translations: {
                id: true,
                name: true,
                address: true,
                languageCode: true,
              },
            },
          },
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

  async createBooking(bookingData: CreateBookingRequestDto) {
    const queryRunner =
      this.foodDrinkBooksRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    console.log(bookingData.booking.user);

    try {
      if (!bookingData.booking.user) {
        throw new Error('User ID is missing');
      }
      // Step 1: Create Payment first
      const payment = this.paymentRepository.create(bookingData.payment);
      const savedPayment = await queryRunner.manager.save(payment);

      if (!savedPayment) {
        throw new Error('Payment creation failed');
      }

      const paymentEntity = Array.isArray(savedPayment)
        ? savedPayment[0]
        : savedPayment;

      // Step 2: Create Booking first and link paymentId
      const booking = this.bookingsRepository.create({
        ...bookingData.booking,
        payment: { id: paymentEntity.id },
        user: { id: bookingData.booking.user },
        movie: { id: bookingData.booking.movie },
        showTimes: { id: bookingData.booking.showTimes },
      });
      const savedBooking = await queryRunner.manager.save(booking);

      if (!savedBooking) {
        throw new Error('Booking creation failed');
      }

      const bookingEntity = Array.isArray(savedBooking)
        ? savedBooking[0]
        : savedBooking;

      // Step 3: Create Tickets and Link to Booking
      const ticketEntities = bookingData.tickets.map((ticket) =>
        this.ticketRepository.create(ticket),
      );
      const savedTickets = await queryRunner.manager.save(ticketEntities);

      // Step 4: Create Food & Drink Books and Link to Booking
      const foodDrinkEntities = bookingData.foodDrinks.map((foodDrink) => {
        return this.foodDrinkBooksRepository.create({
          foodDrinks: { id: foodDrink.foodDrinksId }, // Đảm bảo foodDrinksId được truyền đúng
          quantity: foodDrink.quantity,
          price: foodDrink.price,
        });
      });

      const savedFoodDrinkBooks =
        await queryRunner.manager.save(foodDrinkEntities);

      // Step 5: Create BookingDetails and Link to Booking
      const bookingDetails = this.bookingDetailsRepository.create({
        ...bookingData.bookingDetails,
        booking: bookingEntity,
        tickets: savedTickets,
        foodDrinks: savedFoodDrinkBooks,
      });
      const savedBookingDetails =
        await queryRunner.manager.save(bookingDetails);

      const bookingDetailsEntity = Array.isArray(savedBookingDetails)
        ? savedBookingDetails[0]
        : savedBookingDetails;

      // Step 6: Update the Booking with BookingDetails
      bookingEntity.bookingDetails = bookingDetailsEntity;
      await queryRunner.manager.save(bookingEntity);

      // Commit the transaction
      await queryRunner.commitTransaction();
      return { success: true, bookingId: bookingEntity.id };
    } catch (error) {
      // Rollback if there's any error
      await queryRunner.rollbackTransaction();
      throw new Error('Transaction failed: ' + error.message);
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}
