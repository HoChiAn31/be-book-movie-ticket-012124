import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FoodDrinksService } from './food-drinks.service';
import { query } from 'express';
import { FilterFoodDinksDto } from './dto/filter-food-drinks.dto';
import { FoodDrinks } from './entities/food-drinks.entity';
import { UpdateResult } from 'typeorm';
import { UpdateFoodDrinkDto } from './dto/update-food-drinks.dto';
import { CreateFoodDrinkDto } from './dto/create-food-drinks.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@ApiTags('food-drinks')
@Controller('food-drinks')
export class FoodDrinksController {
  constructor(private readonly foodDrinksService: FoodDrinksService) {}

  @Get()
  findAll(@Query() query: FilterFoodDinksDto): Promise<FoodDrinks[]> {
    return this.foodDrinksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FoodDrinks> {
    return this.foodDrinksService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createFoodDrink(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFoodDrinkDto: CreateFoodDrinkDto,
  ) {
    // // Check if the file exists
    // console.log('file', file);
    // console.log('createFoodDrinkDto', createFoodDrinkDto);

    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    // Validate file type
    const validImageTypes = ['.jpg', '.jpeg', '.png', '.webp']; // Add more types as needed
    const fileExtension = extname(file.originalname).toLowerCase();

    if (!validImageTypes.includes(fileExtension)) {
      throw new BadRequestException(
        'Only .jpg, .jpeg, and .png files are allowed',
      );
    }

    // Upload the image and get the URL
    const imageUrl = await this.foodDrinksService.uploadImage(file);
    createFoodDrinkDto.image = imageUrl; // Assign the image URL to the DTO
    const parsedTranslations = createFoodDrinkDto.translations.map(
      (translation) =>
        typeof translation === 'string' ? JSON.parse(translation) : translation,
    );
    createFoodDrinkDto.translations = parsedTranslations;
    return this.foodDrinksService.createFoodDrinkWithTranslation(
      createFoodDrinkDto,
    );
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() foodDrinks: UpdateFoodDrinkDto,
  ): Promise<UpdateResult> {
    return this.foodDrinksService.update(id, foodDrinks);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodDrinksService.remove(id);
  }
}
