import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { FoodDrinkTranslationsService } from './food-drink-translations.service';
import { CreateFoodDrinkTranslationsDto } from './dto/create-food-drink-translations.dto';
import { UpdateFoodDrinkTranslationsDto } from './dto/update-food-drink-translations.dto';
import { FilterFoodDrinkTranslationsDto } from './dto/filter-food-drink-traslations.dto';
import { FoodDrinkTranslations } from './entites/food-drink-translations.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('food-drink-translations')
export class FoodDrinkTranslationsController {
  constructor(
    private readonly foodDrinkTranslationsService: FoodDrinkTranslationsService,
  ) {}

  @Post()
  async create(
    @Body() createDto: CreateFoodDrinkTranslationsDto,
  ): Promise<FoodDrinkTranslations> {
    return this.foodDrinkTranslationsService.create(createDto);
  }

  @Get()
  async findAll(@Query() query: FilterFoodDrinkTranslationsDto): Promise<any> {
    return this.foodDrinkTranslationsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FoodDrinkTranslations> {
    return this.foodDrinkTranslationsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateFoodDrinkTranslationsDto,
  ): Promise<UpdateResult> {
    return this.foodDrinkTranslationsService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.foodDrinkTranslationsService.delete(id); // Ensure this method returns DeleteResult
  }
}
