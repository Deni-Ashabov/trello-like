import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    example: 'Buy groceries',
    description: 'Название карточки',
  })
  @IsString({ message: 'Заголовок карточки должен быть строкой' })
  @IsNotEmpty({ message: 'Заголовок карточки не должен быть пустым' })
  @MaxLength(100, {
    message: 'Заголовок карточки должен содержать максимум 100 символов',
  })
  title: string;

  @ApiProperty({
    example: 'Need to buy milk, eggs, and bread',
    description: 'Описание карточки',
    required: false,
  })
  @IsString({ message: 'Описание карточки должно быть строкой' })
  @IsNotEmpty({ message: 'Описание карточки не должно быть пустым' })
  @MaxLength(500, {
    message: 'Описание карточки должно содержать максимум 500 символов',
  })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'ID колонки, к которой относится карточка',
  })
  @IsInt({ message: 'ID колонки должно быть целым числом' })
  @Min(1, { message: 'ID колонки должно быть больше 0' })
  columnId: number;

  @IsNotEmpty({ message: 'ID пользователя не должен быть пустым' })
  @IsInt({ message: 'ID колонки должно быть целым числом' })
  @Min(1, { message: 'ID колонки должно быть больше 0' })
  userId: number;
}
