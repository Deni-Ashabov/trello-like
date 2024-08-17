import {
  Entity,
  PrimaryGeneratedColumn,
  Column as DbColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('columns')
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @DbColumn()
  name: string;

  @ManyToOne(() => User, (user) => user.columns, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];

  @DbColumn()
  userId: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
