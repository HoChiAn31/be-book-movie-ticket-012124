import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { BranchTranslationService } from './branch-translation.service';
import { CreateBranchTransitionDto } from './dto/create-branch-translation.dto';
import { BranchTranslation } from './entities/branch-translation.entity';
import { FilterBranchTranslationDto } from './dto/filter-branch-translation.dto';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Branch Translation')
@Controller('branch-translation')
export class BranchTranslationController {
  constructor(private branchTranslationService: BranchTranslationService) {}

  @Post()
  create(
    @Body() createBranchTransitionDto: CreateBranchTransitionDto,
  ): Promise<BranchTranslation> {
    return this.branchTranslationService.create(createBranchTransitionDto);
  }

  @Get()
  findAll(@Query() query: FilterBranchTranslationDto): Promise<any> {
    return this.branchTranslationService.findAll(query);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBranchTranslationDto: Partial<CreateBranchTransitionDto>,
  ): Promise<BranchTranslation> {
    return this.branchTranslationService.update(id, updateBranchTranslationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BranchTranslation> {
    return this.branchTranslationService.findOne(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.branchTranslationService.remove(id);
  }
}
