import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, Movie, User])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
