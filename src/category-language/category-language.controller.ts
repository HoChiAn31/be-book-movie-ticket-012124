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
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryLanguage } from './entites/category-language.entity';
import { FilterCategoryLanguageDto } from './dto/filter-catetory-language.dto';
import { CategoryLanguageService } from './category-language.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { UpdateCategoryLanguageDto } from './dto/update-category-language.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category Language')
@Controller('category-language')
export class CategoryLanguageController {
  constructor(private categoryLanguageService: CategoryLanguageService) {}
  @Get()
  findAll(
    @Query() query: FilterCategoryLanguageDto,
  ): Promise<CategoryLanguage[]> {
    return this.categoryLanguageService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CategoryLanguage> {
    return this.categoryLanguageService.findOne(id);
  }
  @Post()
  create(
    @Body() categoryLanguage: CategoryLanguage,
  ): Promise<CategoryLanguage> {
    return this.categoryLanguageService.create(categoryLanguage);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateCategoryLanguageDto,
  ) {
    return this.categoryLanguageService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryLanguageService.delete(id);
  }
  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('flag', {
      storage: storageConfig('flag'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError = 'File size should be less than 5MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    // console.log('uploadAvatar', file);
    // console.log('user data', req.user_data);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    this.categoryLanguageService.updateAvatar(
      req.user_data.id,
      file.destination + '/' + file.filename,
    );
  }
}
