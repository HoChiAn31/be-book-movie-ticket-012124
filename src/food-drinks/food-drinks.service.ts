import { Injectable, NotFoundException } from '@nestjs/common';
import { FoodDrinks } from './entities/food-drinks.entity';
import { Like, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFoodDrinkDto } from './dto/create-food-drinks.dto';
import { UpdateFoodDrinkDto } from './dto/update-food-drinks.dto';
import { FilterFoodDinksDto } from './dto/filter-food-drinks.dto';
import { EntityManager } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { FoodDrinkTranslations } from 'src/food-drink-translations/entites/food-drink-translations.entity';
import { bucket } from 'src/config/firebase.config';

@Injectable()
export class FoodDrinksService {
  constructor(
    @InjectRepository(FoodDrinks)
    private readonly foodDrinksRepository: Repository<FoodDrinks>,
    @InjectRepository(FoodDrinkTranslations)
    private readonly foodDrinkTranslationRepository: Repository<FoodDrinkTranslations>,
  ) {}

  async create(foodDrinks: FoodDrinks): Promise<FoodDrinks> {
    return await this.foodDrinksRepository.save(foodDrinks);
  }

  async findAll(query: FilterFoodDinksDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';

    const [res, total] = await this.foodDrinksRepository.findAndCount({
      where: {
        translations: {
          name: Like('%' + search + '%'),
        },
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,
      relations: {
        translations: {
          categoryLanguage: true,
        },
      },
      select: {
        id: true,
        price: true,
        image: true,
        translations: {
          id: true,
          name: true,
          description: true,
          categoryLanguage: {
            id: true,
            languageCode: true,
          },
        },
        createdAt: true,
        updatedAt: true,
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

  async findOne(id: string): Promise<FoodDrinks> {
    return await this.foodDrinksRepository.findOne({
      where: { id },
      relations: {
        translations: {
          categoryLanguage: true,
        },
      },
    });
  }

  // async update(
  //   id: string,
  //   updateFoodDrinks: UpdateFoodDrinkDto,
  // ): Promise<UpdateResult> {
  //   // return await this.foodDrinksRepository.update(id, foodDrinks as any);
  // }
  async update(
    id: string,
    updateFoodDrinks: UpdateFoodDrinkDto,
  ): Promise<UpdateResult> {
    return this.foodDrinksRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const foodDrink = await transactionalEntityManager.findOne(FoodDrinks, {
          where: { id },
          relations: ['translations.categoryLanguage'], // Nạp mối quan hệ
        });

        if (!foodDrink) {
          throw new NotFoundException('Food or Drink not found');
        }
        if (updateFoodDrinks.translations) {
          for (const transactionDto of updateFoodDrinks.translations) {
            // Kiểm tra xem translation có tồn tại không
            const existingTranslation =
              await transactionalEntityManager.findOne(FoodDrinkTranslations, {
                where: {
                  foodDrinks: { id },
                  categoryLanguage: { id: transactionDto.categoryLanguage },
                },
              });

            if (existingTranslation) {
              // Nếu đã tồn tại, chỉ cập nhật
              await transactionalEntityManager.update(
                FoodDrinkTranslations,
                { id: existingTranslation.id },
                {
                  ...transactionDto,
                  categoryLanguage: { id: transactionDto.categoryLanguage },
                },
              );
            } else {
              // Nếu không tồn tại, thêm mới
              await transactionalEntityManager.insert(FoodDrinkTranslations, {
                ...transactionDto,
                foodDrinks: { id },
                categoryLanguage: { id: transactionDto.categoryLanguage },
              });
            }
          }
        }

        // Loại bỏ translations khi cập nhật các trường khác của FoodDrinks
        const { translations, ...foodDrinkUpdateData } = updateFoodDrinks;

        // Cập nhật thông tin khác cho FoodDrinks
        return transactionalEntityManager.update(
          FoodDrinks,
          id,
          foodDrinkUpdateData,
        );
      },
    );
  }

  async remove(id: string): Promise<void> {
    await this.foodDrinksRepository.delete({ id });
  }

  // async createFoodDrinkWithTranslation(
  //   createFoodDrinkDto: CreateFoodDrinkDto,
  // ): Promise<FoodDrinks> {
  //   return await this.foodDrinksRepository.manager.transaction(
  //     async (transactionalEntityManager: EntityManager) => {
  //       const foodDrink = this.foodDrinksRepository.create({
  //         price: createFoodDrinkDto.price.toString(),
  //         image: createFoodDrinkDto.image,
  //       });

  //       const savedFoodDrink = await transactionalEntityManager.save(foodDrink);

  //       const foodDrinkTranslations = createFoodDrinkDto.translations.map(
  //         (translation) => ({
  //           ...translation,
  //           foodDrink: savedFoodDrink,
  //         }),
  //       );

  //       await transactionalEntityManager.save(foodDrinkTranslations);

  //       return savedFoodDrink;
  //     },
  //   );
  // }
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const folder = 'food-drink';
    const fileName = `${uuidv4()}-${file.originalname}`;
    const filePath = `${folder}/${fileName}`;
    const fileUpload = bucket.file(filePath);

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    // Lấy URL công khai của file đã upload
    const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;

    return fileUrl;
  }

  async createFoodDrinkWithTranslation(
    createFoodDrinkDto: CreateFoodDrinkDto,
  ): Promise<FoodDrinks> {
    return await this.foodDrinksRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Create and save FoodDrink entity
        const foodDrink = this.foodDrinksRepository.create({
          price: createFoodDrinkDto.price,
          image: createFoodDrinkDto.image,
        });

        const savedFoodDrink = await transactionalEntityManager.save(foodDrink);

        // Create and save FoodDrinkTranslations entities
        const foodDrinkTranslations = createFoodDrinkDto.translations.map(
          (translation) => {
            return this.foodDrinkTranslationRepository.create({
              ...translation,
              foodDrinks: savedFoodDrink,
              categoryLanguage: { id: translation.categoryLanguageId }, // associate with the saved foodDrink
            });
          },
        );

        await transactionalEntityManager.save(foodDrinkTranslations);

        return savedFoodDrink;
      },
    );
  }
  async createFoodDrinkWithTranslationURL(
    createFoodDrinkDto: CreateFoodDrinkDto,
  ): Promise<FoodDrinks> {
    return await this.foodDrinksRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Create and save FoodDrink entity
        const foodDrink = this.foodDrinksRepository.create({
          price: createFoodDrinkDto.price.toString(),
          image: createFoodDrinkDto.image,
        });

        const savedFoodDrink = await transactionalEntityManager.save(foodDrink);

        // Create and save FoodDrinkTranslations entities
        const foodDrinkTranslations = createFoodDrinkDto.translations.map(
          (translation) => {
            return this.foodDrinkTranslationRepository.create({
              ...translation,
              foodDrinks: savedFoodDrink,
              categoryLanguage: { id: translation.categoryLanguageId }, // associate with the saved foodDrink
            });
          },
        );

        await transactionalEntityManager.save(foodDrinkTranslations);

        return savedFoodDrink;
      },
    );
  }
}
