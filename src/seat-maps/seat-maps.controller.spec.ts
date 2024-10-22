import { Test, TestingModule } from '@nestjs/testing';
import { SeatMapsController } from './seat-maps.controller';

describe('SeatMapsController', () => {
  let controller: SeatMapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatMapsController],
    }).compile();

    controller = module.get<SeatMapsController>(SeatMapsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
