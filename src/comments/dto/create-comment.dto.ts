import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'This is a comment',
    description: 'Содержание комментария',
  })
  @IsString({ message: 'Текст комментария должен быть строкой' })
  @IsNotEmpty({ message: 'Текст комментария не должен быть пустым' })
  @MaxLength(500, {
    message: 'Текст комментария должен содержать максимум 500 символов',
  })
  content: string;

  @ApiProperty({
    example: 1,
    description: 'ID карточки, к которой относится комментарий',
  })
  @IsInt({ message: 'ID карточки должно быть целым числом' })
  @Min(1, { message: 'ID карточки должно быть больше 0' })
  cardId: number;

  @ApiProperty({
    example: 1,
    description: 'ID пользователя, к которому относится коментарий',
  })
  @IsInt({ message: 'ID пользователя должно быть целым числом' })
  @Min(1, { message: 'ID пользователя должно быть больше 0' })
  userId: number;
}
