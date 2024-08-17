import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class CommentOwnershipGuard implements CanActivate {
  constructor(private readonly commentsService: CommentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const commentId = request.params.id;

    const comment = await this.commentsService.findOne(commentId);

    if (!comment) {
      throw new UnauthorizedException('Comment not found.');
    }

    if (comment.userId !== user.id) {
      throw new UnauthorizedException(
        'You do not have permission to perform this action.',
      );
    }

    return true;
  }
}
