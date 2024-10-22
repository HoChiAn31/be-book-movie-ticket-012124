import { Test, TestingModule } from '@nestjs/testing';
import { SeatMapTranslationService } from './seat-map-translation.service';

describe('SeatMapTranslationService', () => {
  let service: SeatMapTranslationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeatMapTranslationService],
    }).compile();

    service = module.get<SeatMapTranslationService>(SeatMapTranslationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
