import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-bookings.dto';
import { UpdateBookingDto } from './dto/update-bookings.dto';
import { FilterBookingsDto } from './dto/filter-bookings.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }
  @Get()
  findAll(@Query() query: FilterBookingsDto) {
    return this.bookingsService.findAll(query);
  }
  @Get('/findAllRevenue')
  findAllRevenue(@Query() query: FilterBookingsDto) {
    return this.bookingsService.findAllRevenue(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }

  @Post('create-booking')
  async createBooking(@Body() bookingData: any) {
    try {
      const result = await this.bookingsService.createBooking(bookingData);
      return result;
    } catch (error) {
      throw new Error('Booking creation failed: ' + error.message);
    }
  }
}
