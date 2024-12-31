import { Injectable } from '@nestjs/common';
import { Tickets } from './entities/tickets.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketsDto } from './dto/create-tickets.dto';
import { UpdateTicketsDto } from './dto/update-tickets.dto';
import { FilterTicketsDto } from './dto/filter-tickets.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Tickets)
    private readonly ticketsRepository: Repository<Tickets>,
  ) {}

  async create(createTicketDto: CreateTicketsDto): Promise<Tickets> {
    const ticket = this.ticketsRepository.create(createTicketDto);
    return this.ticketsRepository.save(ticket);
  }

  async findAll(query: FilterTicketsDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const [res, total] = await this.ticketsRepository.findAndCount({
      where: [{ ticketType: Like('%' + keyword + '%') }],
      // relations: {
      //   showTimes: true,
      // },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,

      select: {
        id: true,
        ticketPrice: true,
        ticketType: true,
        quantity: true,
        createdAt: true,
        updatedAt: true,
        // showTimes: {
        //   id: true,
        //   price: true,
        //   movie: {
        //     id: true,
        //     translations: {
        //       id: true,
        //       name: true,
        //     },.
        //   },
        // },
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
  async findOne(id: string): Promise<Tickets> {
    return this.ticketsRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateTicketDto: UpdateTicketsDto,
  ): Promise<UpdateResult> {
    return this.ticketsRepository.update(id, updateTicketDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.ticketsRepository.delete(id);
  }
}
