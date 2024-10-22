import { Test, TestingModule } from '@nestjs/testing';
import { BranchTranslationService } from './branch-translation.service';

describe('BranchTranslationService', () => {
  let service: BranchTranslationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchTranslationService],
    }).compile();

    service = module.get<BranchTranslationService>(BranchTranslationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
