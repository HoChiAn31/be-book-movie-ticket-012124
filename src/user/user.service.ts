import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { bucket } from 'src/config/firebase.config';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(query: FilterUserDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const [res, total] = await this.userRepository.findAndCount({
      where: [
        { firstName: Like('%' + keyword + '%') },
        { lastName: Like('%' + keyword + '%') },
        { email: Like('%' + keyword + '%') },
      ],

      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,

      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'role',
        'password',
        'status',
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

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hasPassword = await bcrypt.hash(createUserDto.password, 10);
    return await this.userRepository.save(createUserDto);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async updateAvatar(id: number, avatar: string): Promise<UpdateResult> {
    return await this.userRepository.update(id, { avatar });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const folder = 'avatars'; // Set your desired folder
      const fileName = `${uuidv4()}-${file.originalname}`;
      const filePath = `${folder}/${fileName}`;
      const fileUpload = bucket.file(filePath);

      // Upload the image to Firebase Storage
      await fileUpload.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });

      // Generate the public URL of the uploaded image
      const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media`;

      return fileUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new InternalServerErrorException('Image upload failed');
    }
  }
  async checkPassword(id: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  }
}
