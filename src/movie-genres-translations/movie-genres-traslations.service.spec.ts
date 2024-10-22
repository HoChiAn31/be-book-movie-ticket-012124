import { Test, TestingModule } from '@nestjs/testing';
import { MovieGenresTranslationService } from './movie-genres-traslations.service';

describe('MovieGenresTranslationService', () => {
  let service: MovieGenresTranslationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieGenresTranslationService],
    }).compile();

    service = module.get<MovieGenresTranslationService>(
      MovieGenresTranslationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
