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
import { BookingDetailsService } from './booking-details.service';
import { FilterBookingDetailsDto } from './dto/filter-booking-details.dto';
import { CreateBookingDetailsDto } from './dto/create-booking-details.dto';
import { UpdateBookingDetailsDto } from './dto/update-booking-details.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Booking Details')
@Controller('booking-details')
export class BookingDetailsController {
  constructor(private readonly bookingDetailsService: BookingDetailsService) {}
  @Get()
  async findAll(@Query() query: FilterBookingDetailsDto) {
    return this.bookingDetailsService.findAll(query);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookingDetailsService.findOne(id);
  }
  @Post()
  async create(@Body() createBookingDetailsDto: CreateBookingDetailsDto) {
    return this.bookingDetailsService.create(createBookingDetailsDto);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookingDetailsDto: UpdateBookingDetailsDto,
  ): Promise<UpdateResult> {
    return this.bookingDetailsService.update(id, updateBookingDetailsDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.bookingDetailsService.remove(id);
  }
}
