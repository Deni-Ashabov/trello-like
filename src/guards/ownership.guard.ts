import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';
import { ColumnsService } from 'src/columns/columns.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly columnsService: ColumnsService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const columnId = request.params.id;

    const column = await this.columnsService.findOne(columnId);

    if (!column) {
      throw new UnauthorizedException('Column not found.');
    }

    if (column.userId !== user.id) {
      throw new UnauthorizedException(
        'You do not have permission to perform this action.',
      );
    }

    return true;
  }
}
