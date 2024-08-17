import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { Column } from './entities/column.entity';
import { UpdateColumnDto } from './dto/update-column.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OwnershipGuard } from 'src/guards/ownership.guard';

@ApiTags('Columns')
@Controller('users/:userId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @ApiOperation({ summary: 'Получить все колонки пользователя' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID пользователя' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Колонки пользователя успешно получены',
    schema: {
      example: [
        {
          id: 1,
          title: 'To Do',
          userId: 1,
        },
        {
          id: 2,
          title: 'In Progress',
          userId: 1,
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  async getColumnsByUserId(@Param('userId') userId: number): Promise<Column[]> {
    return this.columnsService.findColumnsByUserId(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать новую колонку для пользователя' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID пользователя' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Колонка успешно создана',
    schema: {
      example: {
        id: 1,
        title: 'To Do',
        userId: 1,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  async createColumn(
    @Param('userId') userId: number,
    @Body() createColumnDto: CreateColumnDto,
  ): Promise<Column> {
    return this.columnsService.createColumn(userId, createColumnDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @ApiOperation({ summary: 'Обновить колонку по ее ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID колонки' })
  @ApiBody({
    type: UpdateColumnDto,
    description: 'Данные для обновления колонки',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Колонка успешно обновлена',
    type: Column,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Колонка не найдена',
  })
  async updateColumn(
    @Param('id') id: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ): Promise<Column> {
    return this.columnsService.updateColumn(id, updateColumnDto);
  }

  @Delete(':columnId')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @ApiOperation({ summary: 'Удалить колонку пользователя' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID пользователя' })
  @ApiParam({ name: 'columnId', type: Number, description: 'ID колонки' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Колонка успешно удалена',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Колонка или пользователь не найдены',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteColumn(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
  ): Promise<void> {
    return this.columnsService.deleteColumn(userId, columnId);
  }
}
