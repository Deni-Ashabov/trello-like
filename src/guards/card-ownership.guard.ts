import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CardsService } from 'src/cards/cards.service';

@Injectable()
export class CardOwnershipGuard implements CanActivate {
  constructor(
    private readonly cardsService: CardsService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const cardId = request.params.id;

    const card = await this.cardsService.getCardById(cardId);

    if (!card) {
      throw new UnauthorizedException('Card not found.');
    }

    if (card.userId !== user.id) {
      throw new UnauthorizedException(
        'You do not have permission to perform this action.',
      );
    }

    return true;
  }
}
