import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './entities/comments.entity';

import { Movie } from 'src/movies/entities/movies.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateComment } from './dto/create-comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,

    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new comment
  async create(createCommentDto: CreateComment): Promise<Comments> {
    const { movieId, userId, rating, content } = createCommentDto;

    // Find the movie and user by ID
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    // Check if the movie and user exist
    if (!movie || !user) {
      throw new Error('Movie or User not found');
    }

    // Create the comment
    const newComment = this.commentsRepository.create({
      movie,
      user,
      rating,
      comment: content,
    });

    return this.commentsRepository.save(newComment);
  }

  // Get all comments for a specific movie
  async findAllByMovie(movieId: string): Promise<Comments[]> {
    return this.commentsRepository.find({
      where: { movie: { id: movieId } },
      relations: ['movie', 'user'],
      order: { createdAt: 'DESC' },
      select: {
        id: true,
        comment: true,
        rating: true,
        createdAt: true,
        movie: { id: true },
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
        },
      },
    });
  }

  // Get all comments made by a specific user
  async findAllByUser(userId: string): Promise<Comments[]> {
    return this.commentsRepository.find({
      where: { user: { id: userId } },
      relations: ['movie', 'user'],
    });
  }

  // Update a comment
  async update(id: string, content: string, rating: number): Promise<Comments> {
    const comment = await this.commentsRepository.findOne({ where: { id } });

    if (!comment) {
      throw new Error('Comment not found');
    }

    comment.comment = content;
    comment.rating = rating;

    return this.commentsRepository.save(comment);
  }

  // Delete a comment
  async remove(id: string): Promise<void> {
    const comment = await this.commentsRepository.findOne({ where: { id } });

    if (!comment) {
      throw new Error('Comment not found');
    }

    await this.commentsRepository.remove(comment);
  }
}
