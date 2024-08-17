import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateColumnDto {
  @ApiProperty({
    example: 'In Progress',
    description: 'Новое название колонки',
  })
  @IsString({ message: 'Название колонки должно быть строкой' })
  @IsOptional()
  @MaxLength(100, {
    message: 'Название колонки должно содержать максимум 100 символов',
  })
  name?: string;
}
