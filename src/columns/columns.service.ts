import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { Column } from './entities/column.entity';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private readonly columnsRepository: Repository<Column>,
  ) {}

  async findColumnsByUserId(userId: number): Promise<Column[]> {
    return this.columnsRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number): Promise<Column> {
    const column = await this.columnsRepository.findOne({
      where: { id },
    });

    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }

    return column;
  }

  async createColumn(
    userId: number,
    createColumnDto: CreateColumnDto,
  ): Promise<Column> {
    const column = this.columnsRepository.create({
      ...createColumnDto,
      user: { id: userId },
    });
    return this.columnsRepository.save(column);
  }

  async updateColumn(
    id: number,
    updateColumnDto: UpdateColumnDto,
  ): Promise<Column> {
    const column = await this.columnsRepository.findOne({ where: { id } });
    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }

    Object.assign(column, updateColumnDto);
    return this.columnsRepository.save(column);
  }

  async deleteColumn(userId: number, columnId: number): Promise<void> {
    const column = await this.columnsRepository.findOne({
      where: { id: columnId, user: { id: userId } },
    });
    if (!column) {
      throw new NotFoundException(
        `Column with ID ${columnId} for user ${userId} not found`,
      );
    }
    await this.columnsRepository.remove(column);
  }
}
