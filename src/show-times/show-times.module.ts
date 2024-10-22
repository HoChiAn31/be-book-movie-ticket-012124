import { Module } from '@nestjs/common';
import { ShowTimesService } from './show-times.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowTimes } from './entities/show-times.entity';
import { Room } from 'src/rooms/entities/rooms.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { Movie } from 'src/movies/entities/movies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShowTimes, Room, Branch, Movie])],
  providers: [ShowTimesService],
  exports: [ShowTimesService],
})
export class ShowTimesModule {}
