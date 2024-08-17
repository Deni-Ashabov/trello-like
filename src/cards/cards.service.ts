import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/comments/dto/update-comment.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,

    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const card = this.cardsRepository.create(createCardDto);
    return this.cardsRepository.save(card);
  }

  async getCardById(id: number): Promise<Card> {
    const card = await this.cardsRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async updateCard(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    await this.cardsRepository.update(id, updateCardDto);
    return this.getCardById(id);
  }

  async deleteCard(id: number): Promise<void> {
    const result = await this.cardsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
  }

  async createComment(
    cardId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const card = await this.getCardById(cardId);
    const comment = this.commentsRepository.create({
      ...createCommentDto,
      card,
    });

    return this.commentsRepository.save(comment);
  }

  async getCommentsByCardId(cardId: number): Promise<Comment[]> {
    const card = await this.getCardById(cardId);
    return card.comments;
  }

  async updateComment(
    cardId: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId, card: { id: cardId } },
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }
    Object.assign(comment, updateCommentDto);
    return this.commentsRepository.save(comment);
  }

  async deleteComment(cardId: number, commentId: number): Promise<void> {
    const result = await this.commentsRepository.delete({
      id: commentId,
      card: { id: cardId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }
  }
}
