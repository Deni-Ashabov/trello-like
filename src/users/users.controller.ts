import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';
import { UpdateColumnDto } from 'src/columns/dto/update-column.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Создание нового пользователя' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Данные для создания пользователя',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Пользователь успешно создан',
    schema: {
      example: {
        id: 1,
        email: 'user@example.com',
        name: 'John Doe',
        password: 'hashed_password',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Некорректные данные',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь найден',
    schema: {
      example: {
        id: 1,
        email: 'user@example.com',
        name: 'John Doe',
        password: 'hashed_password',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные пользователя' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Обновляемые данные пользователя',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь успешно обновлен',
    schema: {
      example: {
        id: 1,
        email: 'user@example.com',
        name: 'John Doe',
        password: 'hashed_password',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Пользователь успешно удален',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @Post(':id/columns')
  @ApiOperation({ summary: 'Создать колонку для пользователя' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя' })
  @ApiBody({
    type: CreateColumnDto,
    description: 'Данные для создания колонки',
  })
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
    @Param('id') id: number,
    @Body() createColumnDto: CreateColumnDto,
  ) {
    return this.usersService.createColumn(id, createColumnDto);
  }

  @Get(':id/columns')
  @ApiOperation({ summary: 'Получить все колонки пользователя' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя' })
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
  async getColumnsByUserId(@Param('id') id: number) {
    return this.usersService.getColumnsByUserId(id);
  }

  @Patch(':userId/columns/:columnId')
  @ApiOperation({ summary: 'Обновить колонку пользователя' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя' })
  @ApiParam({ name: 'columnId', type: Number, description: 'ID колонки' })
  @ApiBody({ type: UpdateColumnDto, description: 'Обновляемые данные колонки' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Колонка успешно обновлена',
    schema: {
      example: {
        id: 1,
        title: 'In Progress',
        userId: 1,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Колонка или пользователь не найдены',
  })
  async updateColumn(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.usersService.updateColumn(userId, columnId, updateColumnDto);
  }

  @Delete(':userId/columns/:columnId')
  @ApiOperation({ summary: 'Удалить колонку пользователя' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя' })
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
  ) {
    return this.usersService.deleteColumn(userId, columnId);
  }
}
