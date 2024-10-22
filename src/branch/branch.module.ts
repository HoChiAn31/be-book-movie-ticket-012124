import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { BranchTranslation } from 'src/branch-translation/entities/branch-translation.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Branch, BranchTranslation]),
    ConfigModule,
  ],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
