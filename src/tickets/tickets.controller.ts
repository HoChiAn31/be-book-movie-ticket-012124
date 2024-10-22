import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketsDto } from './dto/create-tickets.dto';
import { Tickets } from './entities/tickets.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateTicketsDto } from './dto/update-tickets.dto';
import { FilterTicketsDto } from './dto/filter-tickets.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketsDto): Promise<Tickets> {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll(@Query() query: FilterTicketsDto): Promise<Tickets[]> {
    return this.ticketsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tickets> {
    return this.ticketsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketsDto,
  ): Promise<UpdateResult> {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.ticketsService.remove(id);
  }
}
