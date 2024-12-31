import { Test, TestingModule } from '@nestjs/testing';
import { FoodDrinkBooksController } from './food-drink-books.controller';

describe('FoodDrinkBooksController', () => {
  let controller: FoodDrinkBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodDrinkBooksController],
    }).compile();

    controller = module.get<FoodDrinkBooksController>(FoodDrinkBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
