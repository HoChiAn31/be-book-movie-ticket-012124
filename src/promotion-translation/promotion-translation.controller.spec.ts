import { Test, TestingModule } from '@nestjs/testing';
import { PromotionTranslationController } from './promotion-translation.controller';

describe('PromotionTranslationController', () => {
  let controller: PromotionTranslationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromotionTranslationController],
    }).compile();

    controller = module.get<PromotionTranslationController>(PromotionTranslationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
