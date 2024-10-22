import { Test, TestingModule } from '@nestjs/testing';
import { CategoryLanguageService } from './category-language.service';

describe('CategoryLanguageService', () => {
  let service: CategoryLanguageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryLanguageService],
    }).compile();

    service = module.get<CategoryLanguageService>(CategoryLanguageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
