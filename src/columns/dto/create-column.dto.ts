import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({
    example: 'To Do',
    description: 'Название колонки',
  })
  @IsString({ message: 'Название колонки должно быть строкой' })
  @IsNotEmpty({ message: 'Название колонки не должно быть пустым' })
  @MaxLength(100, {
    message: 'Название колонки должно содержать максимум 100 символов',
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'ID пользователя, к которому относится колонка',
  })
  @IsInt({ message: 'ID пользователя должно быть целым числом' })
  @Min(1, { message: 'ID пользователя должно быть больше 0' })
  userId: number;
}
