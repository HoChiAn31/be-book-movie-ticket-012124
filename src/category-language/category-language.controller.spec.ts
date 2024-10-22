import { Test, TestingModule } from '@nestjs/testing';
import { CategoryLanguageController } from './category-language.controller';

describe('CategoryLanguageController', () => {
  let controller: CategoryLanguageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryLanguageController],
    }).compile();

    controller = module.get<CategoryLanguageController>(CategoryLanguageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
