import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Column } from 'src/columns/entities/column.entity';
import { UpdateColumnDto } from 'src/columns/dto/update-column.dto';
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Column)
    private columnsRepository: Repository<Column>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingByEmail = await this.findByEmail(createUserDto.email);

    if (existingByEmail) {
      throw new BadRequestException();
    }

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['columns'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.getUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async createColumn(
    userId: number,
    createColumnDto: CreateColumnDto,
  ): Promise<Column> {
    const user = await this.getUserById(userId);
    const column = this.columnsRepository.create({
      ...createColumnDto,
      user,
    });

    return this.columnsRepository.save(column);
  }

  async getColumnsByUserId(userId: number): Promise<Column[]> {
    const user = await this.getUserById(userId);
    return user.columns;
  }

  async updateColumn(
    userId: number,
    columnId: number,
    updateColumnDto: UpdateColumnDto,
  ): Promise<Column> {
    const column = await this.columnsRepository.findOne({
      where: { id: columnId, user: { id: userId } },
    });

    if (!column) {
      throw new NotFoundException(`Column with ID ${columnId} not found`);
    }

    Object.assign(column, updateColumnDto);
    return this.columnsRepository.save(column);
  }

  async deleteColumn(userId: number, columnId: number): Promise<void> {
    const result = await this.columnsRepository.delete({
      id: columnId,
      user: { id: userId },
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Column with ID ${columnId} not found`);
    }
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
