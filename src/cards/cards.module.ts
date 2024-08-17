import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Comment } from 'src/comments/entities/comment.entity';
import { UsersModule } from 'src/users/users.module';
import { CardOwnershipGuard } from 'src/guards/card-ownership.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, Comment]),
    forwardRef(() => UsersModule),
  ],
  providers: [CardsService, CardOwnershipGuard],
  controllers: [CardsController],
  exports: [CardsService],
})
export class CardsModule {}
