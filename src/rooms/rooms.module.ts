import { Module } from '@nestjs/common';
import { Room } from './entities/rooms.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Branch } from 'src/branch/entities/branch.entity';
import { ConfigModule } from '@nestjs/config';
import { BranchTranslation } from 'src/branch-translation/entities/branch-translation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Branch, BranchTranslation]),
    ConfigModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService, TypeOrmModule],
})
export class RoomsModule {}
