import { Test, TestingModule } from '@nestjs/testing';
import { FoodDrinkTranslationsService } from './food-drink-translations.service';

describe('FoodDrinkTranslationsService', () => {
  let service: FoodDrinkTranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodDrinkTranslationsService],
    }).compile();

    service = module.get<FoodDrinkTranslationsService>(FoodDrinkTranslationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
