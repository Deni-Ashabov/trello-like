import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/cards/entities/card.entity';
import { ColumnsController } from './columns.controller';
import { Column } from './entities/column.entity';
import { ColumnsService } from './columns.service';
import { UsersModule } from 'src/users/users.module';
import { OwnershipGuard } from 'src/guards/ownership.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Column, Card]),
    forwardRef(() => UsersModule),
  ],
  providers: [ColumnsService, OwnershipGuard],
  controllers: [ColumnsController],
  exports: [TypeOrmModule],
})
export class ColumnsModule {}
