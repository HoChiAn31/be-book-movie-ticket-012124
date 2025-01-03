// src/food-drink-books/food-drink-books.controller.ts
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
import { FoodDrinkBooksService } from './food-drink-books.service';
import { CreateFoodDrinkBookDto } from './dto/create-foodDrink-books.dto';
import { FoodDrinkBooks } from './entities/foodDrink-books.entity';
import { FilterFoodDinkBooksDto } from './dto/filter-foodDrink-books.dto';

@Controller('food-drink-books')
export class FoodDrinkBooksController {
  constructor(private readonly foodDrinkBooksService: FoodDrinkBooksService) {}

  @Post()
  create(
    @Body() createFoodDrinkBookDto: CreateFoodDrinkBookDto,
  ): Promise<FoodDrinkBooks> {
    return this.foodDrinkBooksService.create(createFoodDrinkBookDto);
  }

  @Get()
  findAll(@Query() query: FilterFoodDinkBooksDto): Promise<FoodDrinkBooks[]> {
    return this.foodDrinkBooksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FoodDrinkBooks> {
    return this.foodDrinkBooksService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFoodDrinkBookDto: CreateFoodDrinkBookDto,
  ): Promise<FoodDrinkBooks> {
    return this.foodDrinkBooksService.update(id, updateFoodDrinkBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.foodDrinkBooksService.remove(id);
  }
}
