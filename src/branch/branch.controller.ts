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
import { query } from 'express';
import { FilterBranchDto } from './dto/filter-user.dto';
import { Branch } from './entities/branch.entity';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Branch')
@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}
  @Get()
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'items_per_page' })
  @ApiQuery({ name: 'search' })
  findAll(@Query() query: FilterBranchDto): Promise<Branch[]> {
    return this.branchService.findAll(query);
  }

  @Get('/findAllRevenue')
  findAllRevenue(@Query() query: FilterBranchDto): Promise<Branch[]> {
    return this.branchService.findAllRevenue(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Branch> {
    return this.branchService.findOne(id);
  }

  // @Post()
  // create(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
  //   return this.branchService.create(createBranchDto);
  // }
  @Post()
  createBranchWithTranslation(
    @Body() createBranchDto: CreateBranchDto,
  ): Promise<Branch> {
    return this.branchService.createBranchWithTranslation(createBranchDto);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ): Promise<UpdateResult> {
    return this.branchService.update(id, updateBranchDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.branchService.delete(id);
  }
}
