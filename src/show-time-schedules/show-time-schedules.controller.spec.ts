import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimeSchedulesController } from './show-time-schedules.controller';

describe('ShowTimeSchedulesController', () => {
  let controller: ShowTimeSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowTimeSchedulesController],
    }).compile();

    controller = module.get<ShowTimeSchedulesController>(ShowTimeSchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
