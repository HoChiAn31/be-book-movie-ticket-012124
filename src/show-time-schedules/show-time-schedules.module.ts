import { Module } from '@nestjs/common';
import { ShowTimeSchedulesController } from './show-time-schedules.controller';
import { ShowTimeSchedulesService } from './show-time-schedules.service';
import { ShowTimeSchedules } from './entities/show-time-schedules.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ShowTimeSchedules, Movie])],

  controllers: [ShowTimeSchedulesController],
  providers: [ShowTimeSchedulesService],
})
export class ShowTimeSchedulesModule {}
