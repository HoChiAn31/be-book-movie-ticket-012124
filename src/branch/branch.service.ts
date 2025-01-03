import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import {
  DeleteResult,
  EntityManager,
  Like,
  Repository,
  UpdateResult,
} from 'typeorm';
import { FilterBranchDto } from './dto/filter-user.dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BranchTranslation } from 'src/branch-translation/entities/branch-translation.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    @InjectRepository(BranchTranslation)
    private branchTranslationRepository: Repository<BranchTranslation>,
  ) {}

  async findAll(query: FilterBranchDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const [res, total] = await this.branchRepository.findAndCount({
      where: [
        { phone: Like('%' + keyword + '%') },
        { translations: { name: Like('%' + keyword + '%') } },
        // { lastName: Like('%' + keyword + '%') },
        // { email: Like('%' + keyword + '%') },
      ],
      relations: {
        translations: true,
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,

      select: {
        id: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        translations: {
          id: true,
          name: true,
          address: true,
          description: true,
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
  async findAllRevenue(query: FilterBranchDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const [res, total] = await this.branchRepository.findAndCount({
      where: [
        { phone: Like('%' + keyword + '%') },
        { translations: { name: Like('%' + keyword + '%') } },
        // { lastName: Like('%' + keyword + '%') },
        // { email: Like('%' + keyword + '%') },
      ],
      relations: {
        translations: true,
        rooms: {
          bookingDetails: true,
        },
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,

      select: {
        id: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        translations: {
          id: true,
          name: true,
          address: true,
          description: true,
          languageCode: true,
        },
        rooms: true,
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
  async findOne(id: string): Promise<Branch> {
    return await this.branchRepository.findOne({
      where: { id },
      relations: { translations: true },
      select: {
        id: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        translations: {
          id: true,
          name: true,
          address: true,
          description: true,
          languageCode: true,
        },
      },
    });
  }
  // async create(createBranchDto: CreateBranchDto): Promise<Branch> {
  //   return await this.branchRepository.save(createBranchDto);
  // }
  async createBranchWithTranslation(
    createBranchWithTranslationDto: CreateBranchDto,
  ): Promise<Branch> {
    return await this.branchRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Tạo Branch trước
        const branch = this.branchRepository.create({
          email: createBranchWithTranslationDto.email,
          phone: createBranchWithTranslationDto.phone,
        });

        const savedBranch = await transactionalEntityManager.save(branch);

        // Tạo BranchTranslations tương ứng
        const branchTranslations =
          createBranchWithTranslationDto.translations.map((translation) => {
            return this.branchTranslationRepository.create({
              ...translation,
              branch: savedBranch, // Gắn branch đã được lưu vào
            });
          });

        await transactionalEntityManager.save(branchTranslations);

        return savedBranch;
      },
    );
  }
  async update(
    id: string,
    updateBranchDto: UpdateBranchDto,
  ): Promise<UpdateResult> {
    return this.branchRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const branch = await transactionalEntityManager.findOne(Branch, {
          where: { id },
          relations: ['translations'],
        });

        if (!branch) {
          throw new NotFoundException('Branch not found');
        }

        // Update translations
        if (updateBranchDto.translations) {
          for (const translationDto of updateBranchDto.translations) {
            await transactionalEntityManager.upsert(
              BranchTranslation,
              { ...translationDto, branch: { id } },
              ['branch', 'languageCode'],
            );
          }
        }

        // Remove translations from updateBranchDto
        const { translations, ...branchUpdateData } = updateBranchDto;

        // Update main branch fields
        return transactionalEntityManager.update(Branch, id, branchUpdateData);
      },
    );
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.branchRepository.delete(id);
  }
}
