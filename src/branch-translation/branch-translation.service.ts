import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from 'src/branch/entities/branch.entity';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';
import { DeleteResult, Equal, Like, Repository } from 'typeorm';
import { BranchTranslation } from './entities/branch-translation.entity';
import { CreateBranchTransitionDto } from './dto/create-branch-translation.dto';
import { FilterBranchTranslationDto } from './dto/filter-branch-translation.dto';

@Injectable()
export class BranchTranslationService {
  constructor(
    @InjectRepository(Branch) private branchRepository: Repository<Branch>,
    // @InjectRepository(CategoryLanguage)
    // private categoryLanguageRepository: Repository<CategoryLanguage>,
    @InjectRepository(BranchTranslation)
    private branchTranslationRepository: Repository<BranchTranslation>,
  ) {}

  async create(
    createBranchTransitionDto: CreateBranchTransitionDto,
  ): Promise<BranchTranslation> {
    return await this.branchTranslationRepository.save(
      createBranchTransitionDto,
    );
  }

  async findAll(query: FilterBranchTranslationDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';
    const categoryLanguage = query.categoryLanguage || '';

    const [res, total] = await this.branchTranslationRepository.findAndCount({
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
        branch: true,
        categoryLanguage: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        branch: {
          id: true,
          email: true,
          phone: true,
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

  async update(
    id: string,
    updateBranchTranslationDto: Partial<CreateBranchTransitionDto>,
  ): Promise<BranchTranslation> {
    const branchTranslation = await this.branchTranslationRepository.findOne({
      where: { id: id.toString() },
    });
    if (!branchTranslation) {
      throw new NotFoundException(
        `Branch translation with ID "${id}" not found`,
      );
    }

    Object.assign(branchTranslation, updateBranchTranslationDto);
    return this.branchTranslationRepository.save(branchTranslation);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.branchRepository.delete(id);
  }

  async findOne(id: string): Promise<BranchTranslation> {
    const branchTranslation = await this.branchTranslationRepository.findOne({
      where: { id },
      relations: {
        branch: true,
        categoryLanguage: true,
      },
    });
    if (!branchTranslation) {
      throw new NotFoundException(
        `Branch translation with ID "${id}" not found`,
      );
    }
    return branchTranslation;
  }
}
