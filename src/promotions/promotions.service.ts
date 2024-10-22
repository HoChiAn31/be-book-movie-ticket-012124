import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, EntityManager, Repository, UpdateResult } from 'typeorm';
import { Promotions } from './entities/promotions.entity';
import { CreatePromotionsDto } from './dto/create-promotions.dto';
import { FilterPromotionsDto } from './dto/filter-promotions.dto';
import { UpdatePromotionsDto } from './dto/update-promotions.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionTranslation } from 'src/promotion-translation/entities/promotion-translation.entity';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotions)
    private readonly promotionsRepository: Repository<Promotions>,
    @InjectRepository(PromotionTranslation)
    private readonly promotionsTranslationRepository: Repository<PromotionTranslation>,
  ) {}

  async create(createPromotionsDto: CreatePromotionsDto): Promise<Promotions> {
    return await this.promotionsRepository.save(createPromotionsDto);
  }

  async createPromotionWithTranslation(
    createPromotionsDto: CreatePromotionsDto,
  ): Promise<Promotions> {
    return await this.promotionsRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const promotion = this.promotionsRepository.create({
          ...createPromotionsDto,
        });
        const savePromotion = await transactionalEntityManager.save(promotion);

        const PromotionTranslations = createPromotionsDto.translations.map(
          (translation) => {
            return this.promotionsTranslationRepository.create({
              ...translation,
              promotion: savePromotion,
              categoryLanguage: { id: translation.categoryLanguageId },
            });
          },
        );
        await transactionalEntityManager.save(PromotionTranslations);

        return savePromotion;
      },
    );
  }

  async findAll(query: FilterPromotionsDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';

    const [res, total] = await this.promotionsRepository.findAndCount({
      //   where: {
      //     name: Like('%' + search + '%'),
      //   },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,
      relations: {
        translations: true,
      },
      select: {
        id: true,
        discountType: true,
        discountValue: true,
        startDate: true,
        endDate: true,
        minimumPurchase: true,
        applicableMovies: {},
        usageLimit: true,
        usageCount: true,
        isActive: true,
        createdAt: true,
        // updatedAt: true,
        translations: {
          id: true,
          name: true,
          description: true,
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
  async findOne(id: string): Promise<Promotions> {
    return await this.promotionsRepository.findOne({ where: { id } });
  }

  // async update(
  //   id: string,
  //   updatePromotionsDto: UpdatePromotionsDto,
  // ): Promise<UpdateResult> {
  //   return await this.promotionsRepository.update(id, updatePromotionsDto);
  // }
  async update(
    id: string,
    updatePromotions: UpdatePromotionsDto,
  ): Promise<UpdateResult> {
    return await this.promotionsRepository.manager.transaction(
      async (transactionEntityManage: EntityManager) => {
        const promotion = await transactionEntityManage.findOne(Promotions, {
          where: { id },
          relations: ['translations.categoryLanguage'],
        });

        if (!promotion) {
          throw new NotFoundException('Food or Drink not found');
        }
        if (updatePromotions.translations) {
          for (const transactionDto of updatePromotions.translations) {
            const existingTranslation = await transactionEntityManage.findOne(
              PromotionTranslation,
              {
                where: {
                  promotion: { id },
                  categoryLanguage: { id: transactionDto.categoryLanguage },
                },
              },
            );

            if (existingTranslation) {
              await transactionEntityManage.update(
                PromotionTranslation,
                { id: existingTranslation.id },
                {
                  ...transactionDto,
                  categoryLanguage: { id: transactionDto.categoryLanguage },
                },
              );
            } else {
              await transactionEntityManage.insert(PromotionTranslation, {
                ...transactionDto,
                promotion: { id },
                categoryLanguage: { id: transactionDto.categoryLanguage },
              });
            }
          }
        }
        const { translations, ...promotionUpdateData } = updatePromotions;
        return transactionEntityManage.update(
          Promotions,
          id,
          promotionUpdateData,
        );
      },
    );
  }
  async remove(id: string): Promise<DeleteResult> {
    return await this.promotionsRepository.delete(id);
  }
}
