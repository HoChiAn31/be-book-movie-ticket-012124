import { Test, TestingModule } from '@nestjs/testing';
import { SeatMapTranslationController } from './seat-map-translation.controller';

describe('SeatMapTranslationController', () => {
  let controller: SeatMapTranslationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatMapTranslationController],
    }).compile();

    controller = module.get<SeatMapTranslationController>(SeatMapTranslationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
