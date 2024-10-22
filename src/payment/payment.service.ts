import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { FilterPaymentDto } from './dto/filter-payment.dto';
import { Bookings } from 'src/bookings/entites/bookings.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Bookings)
    private readonly bookingRepository: Repository<Bookings>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    // Find the booking
    const booking = await this.bookingRepository.findOneBy({
      id: createPaymentDto.bookingId,
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Create the payment and link it to the booking
    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      booking: booking,
    });

    return this.paymentRepository.save(payment);
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<UpdateResult> {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return this.paymentRepository.update(id, updatePaymentDto);
  }

  async findAll(query: FilterPaymentDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const [res, total] = await this.paymentRepository.findAndCount({
      //   where: [{ : Like('%' + keyword + '%') }],
      relations: {
        booking: true,
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,

      select: {
        id: true,
        paymentMethod: true,
        paymentStatus: true,
        paymentAmount: true,
        createdAt: true,
        updatedAt: true,
        booking: {
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

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.paymentRepository.delete({ id });
  }
}
