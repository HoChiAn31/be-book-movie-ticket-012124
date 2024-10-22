import { Module } from '@nestjs/common';
import { BranchTranslationController } from './branch-translation.controller';
import { BranchTranslationService } from './branch-translation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from 'src/branch/entities/branch.entity';
import { BranchTranslation } from './entities/branch-translation.entity';
import { ConfigModule } from '@nestjs/config';
import { CategoryLanguage } from 'src/category-language/entites/category-language.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Branch, BranchTranslation, CategoryLanguage]),
    ConfigModule,
  ],
  controllers: [BranchTranslationController],
  providers: [BranchTranslationService],
})
export class BranchTranslationModule {}
