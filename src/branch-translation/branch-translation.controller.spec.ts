import { Test, TestingModule } from '@nestjs/testing';
import { BranchTranslationController } from './branch-translation.controller';

describe('BranchTranslationController', () => {
  let controller: BranchTranslationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchTranslationController],
    }).compile();

    controller = module.get<BranchTranslationController>(BranchTranslationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
