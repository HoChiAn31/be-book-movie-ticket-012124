import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

import { Comments } from './entities/comments.entity';
import { CreateComment } from './dto/create-comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Create a new comment
  @Post()
  async create(@Body() createCommentDto: CreateComment): Promise<Comments> {
    return this.commentsService.create(createCommentDto);
  }

  // Get all comments for a specific movie
  @Get('movie/:movieId')
  async findAllByMovie(@Param('movieId') movieId: string): Promise<Comments[]> {
    return this.commentsService.findAllByMovie(movieId);
  }

  // Get all comments by a specific user
  @Get('user/:userId')
  async findAllByUser(@Param('userId') userId: string): Promise<Comments[]> {
    return this.commentsService.findAllByUser(userId);
  }

  // Update a comment
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('content') content: string,
    @Body('rating') rating: number,
  ): Promise<Comments> {
    return this.commentsService.update(id, content, rating);
  }

  // Delete a comment
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.commentsService.remove(id);
  }
}
