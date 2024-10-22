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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { FilterPaymentDto } from './dto/filter-payment.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }
  @Get()
  getAllPayments(@Query() query: FilterPaymentDto) {
    return this.paymentService.findAll(query);
  }

  @Get(':id')
  getPaymentById(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Put(':id')
  updatePayment(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<UpdateResult> {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  async deletePayment(@Param('id') id: string): Promise<DeleteResult> {
    return await this.paymentService.delete(id);
  }
}
