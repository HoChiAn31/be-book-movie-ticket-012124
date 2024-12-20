import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimeSchedulesService } from './show-time-schedules.service';

describe('ShowTimeSchedulesService', () => {
  let service: ShowTimeSchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShowTimeSchedulesService],
    }).compile();

    service = module.get<ShowTimeSchedulesService>(ShowTimeSchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
