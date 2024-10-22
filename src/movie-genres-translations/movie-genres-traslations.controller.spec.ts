import { Test, TestingModule } from '@nestjs/testing';
import { MovieGenreTraslationsController } from './movie-genres-traslations.controller';

describe('MovieGenreTraslationsController', () => {
  let controller: MovieGenreTraslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieGenreTraslationsController],
    }).compile();

    controller = module.get<MovieGenreTraslationsController>(
      MovieGenreTraslationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
