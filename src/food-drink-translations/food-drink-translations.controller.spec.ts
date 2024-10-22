import { Test, TestingModule } from '@nestjs/testing';
import { FoodDrinkTranslationsController } from './food-drink-translations.controller';

describe('FoodDrinkTranslationsController', () => {
  let controller: FoodDrinkTranslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodDrinkTranslationsController],
    }).compile();

    controller = module.get<FoodDrinkTranslationsController>(FoodDrinkTranslationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
