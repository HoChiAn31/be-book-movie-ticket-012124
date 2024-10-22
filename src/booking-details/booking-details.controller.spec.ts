import { Test, TestingModule } from '@nestjs/testing';
import { BookingDetailsController } from './booking-details.controller';

describe('BookingDetailsController', () => {
  let controller: BookingDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingDetailsController],
    }).compile();

    controller = module.get<BookingDetailsController>(BookingDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
