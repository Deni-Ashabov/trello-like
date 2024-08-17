import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
  HttpStatus,
  HttpCode,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CardsService } from '../cards/cards.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentOwnershipGuard } from 'src/guards/comment-ownership.guard';

@ApiTags('Comments')
@Controller('cards/:cardId/comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly cardsService: CardsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создание нового комментария' })
  @ApiBody({
    type: CreateCommentDto,
    description: 'Данные для создания комментария',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Комментарий успешно создан',
    schema: {
      example: {
        id: 1,
        content: 'This is a comment',
        cardId: 1,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Некорректные данные',
  })
  async createComment(
    @Param('cardId') cardId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const card = await this.cardsService.getCardById(cardId);
    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }
    return this.commentsService.createComment(card, createCommentDto);
  }

  @Get('card/:cardId')
  @UseGuards(JwtAuthGuard, CommentOwnershipGuard)
  @ApiOperation({ summary: 'Получить все комментарии для карточки по ID' })
  @ApiParam({ name: 'cardId', type: Number, description: 'ID карточки' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список комментариев для карточки',
    schema: {
      example: [
        {
          id: 1,
          content: 'This is a comment',
          cardId: 1,
        },
        {
          id: 2,
          content: 'Another comment',
          cardId: 1,
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Карточка не найдена',
  })
  async getCommentsByCardId(
    @Param('cardId') cardId: number,
  ): Promise<Comment[]> {
    return this.commentsService.findCommentsByCard(cardId);
  }

  @Patch(':commentId')
  @UseGuards(JwtAuthGuard, CommentOwnershipGuard)
  @ApiOperation({ summary: 'Обновить данные комментария' })
  @ApiParam({ name: 'id', type: Number, description: 'ID комментария' })
  @ApiBody({
    type: UpdateCommentDto,
    description: 'Обновляемые данные комментария',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Комментарий успешно обновлен',
    schema: {
      example: {
        id: 1,
        content: 'Updated comment content',
        cardId: 1,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Комментарий не найден',
  })
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(commentId, updateCommentDto);
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard, CommentOwnershipGuard)
  @ApiOperation({ summary: 'Удалить комментарий' })
  @ApiParam({ name: 'id', type: Number, description: 'ID комментария' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Комментарий успешно удален',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Комментарий не найден',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(@Param('commentId') commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }
}
