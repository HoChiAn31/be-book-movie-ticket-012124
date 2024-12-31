import { Test, TestingModule } from '@nestjs/testing';
import { FoodDrinkBooksService } from './food-drink-books.service';

describe('FoodDrinkBooksService', () => {
  let service: FoodDrinkBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodDrinkBooksService],
    }).compile();

    service = module.get<FoodDrinkBooksService>(FoodDrinkBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
