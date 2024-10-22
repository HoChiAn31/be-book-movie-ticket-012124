import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodDrinkTranslations } from './entites/food-drink-translations.entity';
import { Like, Repository, UpdateResult } from 'typeorm';
import { CreateFoodDrinkTranslationsDto } from './dto/create-food-drink-translations.dto';
import { UpdateFoodDrinkTranslationsDto } from './dto/update-food-drink-translations.dto';
import { FilterFoodDrinkTranslationsDto } from './dto/filter-food-drink-traslations.dto';

@Injectable()
export class FoodDrinkTranslationsService {
  constructor(
    @InjectRepository(FoodDrinkTranslations)
    private readonly foodDrinkTranslationsRepository: Repository<FoodDrinkTranslations>,
  ) {}

  async create(
    foodDrinkTranslations: CreateFoodDrinkTranslationsDto,
  ): Promise<FoodDrinkTranslations> {
    return await this.foodDrinkTranslationsRepository.save(
      foodDrinkTranslations,
    );
  }

  async findAll(query: FilterFoodDrinkTranslationsDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';
    const categoryLanguage = query.categoryLanguage || '';

    const [res, total] =
      await this.foodDrinkTranslationsRepository.findAndCount({
        where: {
          name: Like('%' + search + '%'),
          categoryLanguage: {
            languageCode: Like('%' + categoryLanguage + '%'),
          },
        },
        order: { createdAt: 'DESC' },
        take: items_per_page,
        skip: skip,
        relations: {
          foodDrinks: true,
          categoryLanguage: true,
        },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          foodDrinks: {
            id: true,
            price: true,
            image: true,
          },
          categoryLanguage: {
            id: true,
            languageCode: true,
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

  async findOne(id: string): Promise<FoodDrinkTranslations> {
    return await this.foodDrinkTranslationsRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    foodDrinkTranslations: UpdateFoodDrinkTranslationsDto,
  ): Promise<UpdateResult> {
    return await this.foodDrinkTranslationsRepository.update(
      id,
      foodDrinkTranslations,
    );
  }

  async delete(id: string): Promise<void> {
    await this.foodDrinkTranslationsRepository.delete(id);
  }
}
