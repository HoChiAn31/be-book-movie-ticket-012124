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
import { PromotionsService } from './promotions.service';
import { CreatePromotionsDto } from './dto/create-promotions.dto';
import { UpdatePromotionsDto } from './dto/update-promotions.dto';
import { FilterPromotionsDto } from './dto/filter-promotions.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Promotions')
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}
  @Get()
  findAll(@Query() query: FilterPromotionsDto): Promise<any> {
    return this.promotionsService.findAll(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionsService.findOne(id);
  }
  @Post()
  create(@Body() createPromotionsDto: CreatePromotionsDto) {
    return this.promotionsService.createPromotionWithTranslation(
      createPromotionsDto,
    );
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePromotionsDto: UpdatePromotionsDto,
  ) {
    return this.promotionsService.update(id, updatePromotionsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionsService.remove(id);
  }
}
