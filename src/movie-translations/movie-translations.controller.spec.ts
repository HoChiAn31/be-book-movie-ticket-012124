import { Test, TestingModule } from '@nestjs/testing';
import { MovieTranslationsController } from './movie-translations.controller';

describe('MovieTranslationsController', () => {
  let controller: MovieTranslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieTranslationsController],
    }).compile();

    controller = module.get<MovieTranslationsController>(MovieTranslationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
