import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    example: 'Updated comment content',
    description: 'Новое содержание комментария',
    required: false,
  })
  @IsString({ message: 'Текст комментария должен быть строкой' })
  @IsOptional()
  @MaxLength(500, {
    message: 'Текст комментария должен содержать максимум 500 символов',
  })
  content?: string;
}
