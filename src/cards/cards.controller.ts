import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/comments/dto/update-comment.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CardOwnershipGuard } from 'src/guards/card-ownership.guard';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создание новой карточки' })
  @ApiBody({ type: CreateCardDto, description: 'Данные для создания карточки' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Карточка успешно создана',
    schema: {
      example: {
        id: 1,
        title: 'Buy groceries',
        description: 'Need to buy milk, eggs, and bread',
        columnId: 1,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Некорректные данные',
  })
  async createCard(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.createCard(createCardDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, CardOwnershipGuard)
  @ApiOperation({ summary: 'Получить карточку по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID карточки' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Карточка найдена',
    schema: {
      example: {
        id: 1,
        title: 'Buy groceries',
        description: 'Need to buy milk, eggs, and bread',
        columnId: 1,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Карточка не найдена',
  })
  async getCardById(@Param('id') id: number) {
    return this.cardsService.getCardById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, CardOwnershipGuard)
  @ApiOperation({ summary: 'Обновить данные карточки' })
  @ApiParam({ name: 'id', type: Number, description: 'ID карточки' })
  @ApiBody({ type: UpdateCardDto, description: 'Обновляемые данные карточки' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Карточка успешно обновлена',
    schema: {
      example: {
        id: 1,
        title: 'Buy groceries',
        description: 'Need to buy milk, eggs, and bread',
        columnId: 1,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Карточка не найдена',
  })
  async updateCard(
    @Param('id') id: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.updateCard(id, updateCardDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CardOwnershipGuard)
  @ApiOperation({ summary: 'Удалить карточку' })
  @ApiParam({ name: 'id', type: Number, description: 'ID карточки' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Карточка успешно удалена',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Карточка не найдена',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCard(@Param('id') id: number) {
    return this.cardsService.deleteCard(id);
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard, CardOwnershipGuard)
  @ApiOperation({ summary: 'Создать новый комментарий для карточки' })
  @ApiParam({ name: 'cardId', type: Number, description: 'ID карточки' })
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
    @Param('id') id: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.cardsService.createComment(id, createCommentDto);
  }

  @Get(':id/comments')
  @UseGuards(JwtAuthGuard, CardOwnershipGuard)
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
  async getCommentsByCardId(@Param('id') id: number) {
    return this.cardsService.getCommentsByCardId(id);
  }

  @Patch(':cardId/comments/:commentId')
  @UseGuards(JwtAuthGuard, CardOwnershipGuard)
  @ApiOperation({ summary: 'Обновить комментарий по его ID' })
  @ApiParam({ name: 'cardId', type: Number, description: 'ID карточки' })
  @ApiParam({ name: 'id', type: Number, description: 'ID комментария' })
  @ApiBody({
    type: UpdateCommentDto,
    description: 'Данные для обновления комментария',
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
    description: 'Комментарий или карточка не найдены',
  })
  async updateComment(
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.cardsService.updateComment(cardId, commentId, updateCommentDto);
  }

  @Delete(':cardId/comments/:commentId')
  @UseGuards(JwtAuthGuard, CardOwnershipGuard)
  @ApiOperation({ summary: 'Удалить комментарий по его ID' })
  @ApiParam({ name: 'cardId', type: Number, description: 'ID карточки' })
  @ApiParam({ name: 'id', type: Number, description: 'ID комментария' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Комментарий успешно удален',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Комментарий или карточка не найдены',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
  ) {
    return this.cardsService.deleteComment(cardId, commentId);
  }
}
