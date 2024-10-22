import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PromotionTranslationService } from './promotion-translation.service';
import { FilterPromotionTranslationDto } from './dto/filter-promotion-translation.dto';
import { CreatePromotionTranslationDto } from './dto/create-promotion-translation.dto';
import { UpdatePromotionTranslationDto } from './dto/update-promotion-translation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Promotion Translation')
@Controller('promotion-translation')
export class PromotionTranslationController {
  constructor(
    private promotionTranslationService: PromotionTranslationService,
  ) {}

  @Get()
  async findAll(@Query() query: FilterPromotionTranslationDto) {
    return await this.promotionTranslationService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.promotionTranslationService.findOne(id);
  }

  @Post()
  async create(
    @Body() createPromotionTranslationDto: CreatePromotionTranslationDto,
  ) {
    return await this.promotionTranslationService.create(
      createPromotionTranslationDto,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePromotionTranslationDto: UpdatePromotionTranslationDto,
  ) {
    return await this.promotionTranslationService.update(
      id,
      updatePromotionTranslationDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.promotionTranslationService.delete(id);
  }
}
