// src/food-drink-books/food-drink-books.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bookings } from 'src/bookings/entites/bookings.entity';
import { FoodDrinks } from 'src/food-drinks/entities/food-drinks.entity';
import { FoodDrinkBooks } from './entities/foodDrink-books.entity';
import { CreateFoodDrinkBookDto } from './dto/create-foodDrink-books.dto';
import { FilterFoodDinkBooksDto } from './dto/filter-foodDrink-books.dto';

@Injectable()
export class FoodDrinkBooksService {
  constructor(
    @InjectRepository(FoodDrinkBooks)
    private foodDrinkBooksRepository: Repository<FoodDrinkBooks>,
    @InjectRepository(Bookings)
    private bookingsRepository: Repository<Bookings>,
    @InjectRepository(FoodDrinks)
    private foodDrinksRepository: Repository<FoodDrinks>,
  ) {}

  async create(
    createFoodDrinkBookDto: CreateFoodDrinkBookDto,
  ): Promise<FoodDrinkBooks> {
    const { foodDrinksId, quantity, price } = createFoodDrinkBookDto;

    // Ensure the foodDrink and booking exist
    const foodDrink = await this.foodDrinksRepository.findOne({
      where: { id: foodDrinksId },
    });

    if (!foodDrink) {
      throw new Error('FoodDrink or Booking not found');
    }

    const foodDrinkBook = this.foodDrinkBooksRepository.create({
      foodDrinks: foodDrink,
      quantity,
      price,
    });

    return this.foodDrinkBooksRepository.save(foodDrinkBook);
  }

  // async findAll(): Promise<FoodDrinkBooks[]> {
  //   return this.foodDrinkBooksRepository.find();
  // }
  async findAll(query: FilterFoodDinkBooksDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';

    const [res, total] = await this.foodDrinkBooksRepository.findAndCount({
      where: {
        // foodDrinks: {
        //   translations: {
        //     name: Like(`%${search}%`),
        //   },
        // },
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip,
      relations: {
        foodDrinks: {
          translations: {
            categoryLanguage: true,
          },
        },
        bookingDetails: true,
      },
      select: {
        id: true,
        quantity: true,
        price: true,
        foodDrinks: {
          id: true,
          price: true,
          image: true,
          type: true,
          soldQuantity: true,
          translations: {
            id: true,
            name: true,
            description: true,
            categoryLanguage: {
              id: true,
              languageCode: true,
            },
          },
        },
        createdAt: true,
        updatedAt: true,
        bookingDetails: {
          id: true,
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
  async findOne(id: string): Promise<FoodDrinkBooks> {
    return this.foodDrinkBooksRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    updateFoodDrinkBookDto: CreateFoodDrinkBookDto,
  ): Promise<FoodDrinkBooks> {
    const foodDrinkBook = await this.findOne(id);

    if (!foodDrinkBook) {
      throw new Error('FoodDrinkBook not found');
    }

    const { foodDrinksId, quantity, price } = updateFoodDrinkBookDto;

    const foodDrink = await this.foodDrinksRepository.findOne({
      where: { id: foodDrinksId },
    });

    if (!foodDrink) {
      throw new Error('FoodDrink or Booking not found');
    }

    foodDrinkBook.foodDrinks = foodDrink;
    foodDrinkBook.quantity = quantity;
    foodDrinkBook.price = price;

    return this.foodDrinkBooksRepository.save(foodDrinkBook);
  }

  async remove(id: string): Promise<void> {
    const foodDrinkBook = await this.findOne(id);

    if (!foodDrinkBook) {
      throw new Error('FoodDrinkBook not found');
    }

    await this.foodDrinkBooksRepository.remove(foodDrinkBook);
  }
}
