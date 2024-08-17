import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({
    example: 'Buy groceries',
    description: 'Новое название карточки',
    required: false,
  })
  @IsString({ message: 'Заголовок карточки должен быть строкой' })
  @IsOptional()
  @MaxLength(100, {
    message: 'Заголовок карточки должен содержать максимум 100 символов',
  })
  title?: string;

  @ApiProperty({
    example: 'Need to buy milk, eggs, and bread',
    description: 'Новое описание карточки',
    required: false,
  })
  @IsString({ message: 'Описание карточки должно быть строкой' })
  @IsOptional()
  @MaxLength(500, {
    message: 'Описание карточки должно содержать максимум 500 символов',
  })
  description?: string;
}
