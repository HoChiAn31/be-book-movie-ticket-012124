import { Injectable, NotFoundException } from '@nestjs/common';
import { Room } from './entities/rooms.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';
import { Branch } from 'src/branch/entities/branch.entity';
import { CreateRoomsDto } from './dto/create-rooms.dto';
import { FilterRoomsDto } from './dto/filter-rooms.dto';
import { UpdateBranchDto } from 'src/branch/dto/update-branch.dto';
import { UpdateRoomsDto } from './dto/update-rooms.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(Branch) private branchRepository: Repository<Branch>,
  ) {}

  async create(createRoomsDto: CreateRoomsDto): Promise<Room> {
    return await this.roomRepository.save(createRoomsDto);
  }

  async findAll(query: FilterRoomsDto): Promise<any> {
    const itemsPerPage = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemsPerPage;
    const search = query.search || '';

    const [res, total] = await this.roomRepository.findAndCount({
      where: { name: Like('%' + search + '%') },
      order: { createdAt: 'DESC' },
      take: itemsPerPage,
      skip: skip,
      relations: {
        branch: {
          translations: true,
        },
      },
      select: {
        id: true,
        name: true,
        screeningType: true,
        totalSeats: true,
        createdAt: true,
        updatedAt: true,
        branch: {
          id: true,
          phone: true,
          translations: {
            id: true,
            languageCode: true,
            name: true,
          },
        },
      },
    });

    const lastPage = Math.ceil(total / itemsPerPage);
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

  async findOne(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: { branch: true },
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async findByBranch(branchId: string, query: FilterRoomsDto): Promise<any> {
    const itemsPerPage = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemsPerPage;
    const search = query.search || '';

    const [res, total] = await this.roomRepository.findAndCount({
      where: {
        branch: { id: branchId },
        name: Like('%' + search + '%'),
      },
      order: { createdAt: 'DESC' },
      take: itemsPerPage,
      skip: skip,
      relations: {
        branch: {
          translations: true,
        },
      },
      select: {
        id: true,
        name: true,
        screeningType: true,
        totalSeats: true,
        createdAt: true,
        updatedAt: true,
        branch: {
          id: true,
          phone: true,
          translations: {
            id: true,
            languageCode: true,
            name: true,
          },
        },
      },
    });
    const lastPage = Math.ceil(total / itemsPerPage);
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
    updateRoomsDto: Partial<UpdateRoomsDto>,
  ): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return this.roomRepository.save({ ...room, ...updateRoomsDto });
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.roomRepository.delete(id);
  }
}
