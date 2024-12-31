import { Bookings } from 'src/bookings/entites/bookings.entity';
import { FoodDrinkBooks } from 'src/food-drink-books/entities/foodDrink-books.entity';
import { Tickets } from 'src/tickets/entities/tickets.entity';

export class UpdateBookingDetailsDto {
  seatNumber: string[];
  price: number;
  quantity: number;
  booking: Bookings;
  tickets: Tickets[];
  foodDrinks: FoodDrinkBooks[];
}
