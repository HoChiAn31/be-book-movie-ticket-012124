import { Test, TestingModule } from '@nestjs/testing';
import { SeatMapsService } from './seat-maps.service';

describe('SeatMapsService', () => {
  let service: SeatMapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeatMapsService],
    }).compile();

    service = module.get<SeatMapsService>(SeatMapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
