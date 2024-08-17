import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from '../cards/cards.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CommentOwnershipGuard } from 'src/guards/comment-ownership.guard';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    CardsModule,
    forwardRef(() => UsersModule),
  ],
  providers: [CommentsService, CommentOwnershipGuard],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
