import { Test, TestingModule } from '@nestjs/testing';
import { MovieGenresController } from './movie-genres.controller';

describe('MovieGenresController', () => {
  let controller: MovieGenresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieGenresController],
    }).compile();

    controller = module.get<MovieGenresController>(MovieGenresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
