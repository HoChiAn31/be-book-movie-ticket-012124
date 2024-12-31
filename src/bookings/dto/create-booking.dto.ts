import {
  IsArray,
  IsString,
  IsNumber,
  IsUUID,
  IsOptional,
  IsEnum,
} from 'class-validator';

// Enum cho trạng thái payment
enum PaymentStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  FAILED = 'Failed',
}

// DTO cho foodDrinks
class CreateFoodDrinksDto {
  @IsUUID()
  foodDrinksId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

// DTO cho payment
class CreatePaymentDto {
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @IsString()
  paymentMethod: string;

  @IsNumber()
  paymentAmount: number;
}

// DTO cho bookingDetails
class CreateBookingDetailsDto {
  @IsArray()
  @IsString({ each: true })
  seatNumber: string[];

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  booking: string;

  @IsArray()
  @IsString({ each: true })
  tickets: string[];

  @IsArray()
  @IsString({ each: true })
  foodDrinks: string[];
}

// DTO cho ticket
class CreateTicketDto {
  @IsString()
  ticketType: string;

  @IsNumber()
  ticketPrice: number;

  @IsNumber()
  quantity: number;
}

// DTO cho booking
class CreateBookingDto {
  @IsUUID()
  user: string;

  @IsNumber()
  totalTickets: number;

  @IsNumber()
  totalAmount: number;

  @IsOptional()
  @IsString()
  payment: string;

  @IsUUID()
  showTimes: string;

  @IsUUID()
  movie: string;
}

// Main DTO cho Create Booking request
export class CreateBookingRequestDto {
  @IsArray()
  foodDrinks: CreateFoodDrinksDto[];

  @IsOptional()
  payment: CreatePaymentDto;

  @IsOptional()
  bookingDetails: CreateBookingDetailsDto;

  @IsArray()
  tickets: CreateTicketDto[];

  @IsOptional()
  booking: CreateBookingDto;
}
