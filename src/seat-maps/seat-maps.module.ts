import { Module } from '@nestjs/common';
import { SeatMapsController } from './seat-maps.controller';
import { SeatMapsService } from './seat-maps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatMap } from './entities/seat-maps.entity';
import { SeatsGateway } from './seats.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([SeatMap])],
  controllers: [SeatMapsController],
  providers: [SeatMapsService, SeatsGateway],
})
export class SeatMapsModule {}
