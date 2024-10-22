import { Test, TestingModule } from '@nestjs/testing';
import { FoodDrinksService } from './food-drinks.service';

describe('FoodDrinksService', () => {
  let service: FoodDrinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodDrinksService],
    }).compile();

    service = module.get<FoodDrinksService>(FoodDrinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
