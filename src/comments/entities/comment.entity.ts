import {
  Entity,
  PrimaryGeneratedColumn,
  Column as DbColumn,
  ManyToOne,
} from 'typeorm';
import { Card } from 'src/cards/entities/card.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @DbColumn()
  text: string;

  @ManyToOne(() => Card, (card) => card.comments, { onDelete: 'CASCADE' })
  card: Card;

  @DbColumn()
  cardId: number;

  @DbColumn()
  userId: number;
}
