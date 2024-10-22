import { Test, TestingModule } from '@nestjs/testing';
import { PromotionTranslationService } from './promotion-translation.service';

describe('PromotionTranslationService', () => {
  let service: PromotionTranslationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionTranslationService],
    }).compile();

    service = module.get<PromotionTranslationService>(PromotionTranslationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
