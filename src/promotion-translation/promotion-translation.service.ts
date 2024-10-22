import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionTranslation } from './entities/promotion-translation.entity';
import { DeleteResult, Like, Repository } from 'typeorm';
import { CreatePromotionTranslationDto } from './dto/create-promotion-translation.dto';
import { UpdatePromotionTranslationDto } from './dto/update-promotion-translation.dto';
import { FilterPromotionTranslationDto } from './dto/filter-promotion-translation.dto';
import { Promotions } from 'src/promotions/entities/promotions.entity';

@Injectable()
export class PromotionTranslationService {
  constructor(
    @InjectRepository(PromotionTranslation)
    private promotionTranslationRepository: Repository<PromotionTranslation>,
    @InjectRepository(Promotions)
    private promotionRepository: Repository<Promotions>,
  ) {}
  async create(
    createPromotionTranslationDto: CreatePromotionTranslationDto,
  ): Promise<PromotionTranslation> {
    return await this.promotionTranslationRepository.save(
      createPromotionTranslationDto,
    );
  }
  async findAll(query: FilterPromotionTranslationDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';
    const categoryLanguage = query.categoryLanguage || '';
    const [res, total] = await this.promotionTranslationRepository.findAndCount(
      {
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
          promotion: true,
          categoryLanguage: true,
        },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          promotion: {
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
          },
          categoryLanguage: {
            id: true,
            languageCode: true,
          },
        },
      },
    );
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
  async findOne(id: string): Promise<PromotionTranslation> {
    return await this.promotionTranslationRepository.findOne({
      where: { id },
      relations: { promotion: true, categoryLanguage: true },
    });
  }
  async update(
    id: string,
    updatePromotionTranslationDto: UpdatePromotionTranslationDto,
  ): Promise<PromotionTranslation> {
    return await this.promotionTranslationRepository.save(
      updatePromotionTranslationDto,
    );
  }
  async delete(id: string): Promise<DeleteResult> {
    return await this.promotionTranslationRepository.delete(id);
  }
}
