import { Test, TestingModule } from '@nestjs/testing';
import { MovieTranslationsService } from './movie-translations.service';

describe('MovieTranslationsService', () => {
  let service: MovieTranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieTranslationsService],
    }).compile();

    service = module.get<MovieTranslationsService>(MovieTranslationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
