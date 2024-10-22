import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryLanguage } from './entites/category-language.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { FilterCategoryLanguageDto } from './dto/filter-catetory-language.dto';
import { CreateCategoryLanguageDto } from './dto/create-category-language.dto';
import { UpdateCategoryLanguageDto } from './dto/update-category-language.dto';

@Injectable()
export class CategoryLanguageService {
  constructor(
    @InjectRepository(CategoryLanguage)
    private categoryLanguageRepository: Repository<CategoryLanguage>,
  ) {}

  async findAll(query: FilterCategoryLanguageDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const [res, total] = await this.categoryLanguageRepository.findAndCount({
      where: [
        { name: Like('%' + keyword + '%') },
        // { lastName: Like('%' + keyword + '%') },
        // { email: Like('%' + keyword + '%') },
      ],

      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,

      select: [
        'id',
        'name',
        'flag',
        'branchTranslations',
        'createdAt',
        'updatedAt',
      ],
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

  async create(
    createCategoryLanguageDto: CreateCategoryLanguageDto,
  ): Promise<CategoryLanguage> {
    return await this.categoryLanguageRepository.save(
      createCategoryLanguageDto,
    );
  }

  async findOne(id: string): Promise<CategoryLanguage> {
    return await this.categoryLanguageRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateCategoryLanguageDto: UpdateCategoryLanguageDto,
  ): Promise<UpdateResult> {
    return await this.categoryLanguageRepository.update(
      id,
      updateCategoryLanguageDto,
    );
  }
  async delete(id: string): Promise<DeleteResult> {
    return await this.categoryLanguageRepository.delete(id);
  }

  async updateAvatar(id: string, flag: string): Promise<UpdateResult> {
    return await this.categoryLanguageRepository.update(id, { flag });
  }
}
