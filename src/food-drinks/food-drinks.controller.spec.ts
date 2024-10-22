import { Test, TestingModule } from '@nestjs/testing';
import { FoodDrinksController } from './food-drinks.controller';

describe('FoodDrinksController', () => {
  let controller: FoodDrinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodDrinksController],
    }).compile();

    controller = module.get<FoodDrinksController>(FoodDrinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
