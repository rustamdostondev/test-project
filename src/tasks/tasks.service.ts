import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @Inject(UsersService)
    private usersService: UsersService,
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<{ id: number }> {
    // cosnt findUser = createTaskDto.created_by
    try {
      const newTask = await this.taskRepository
        .createQueryBuilder()
        .insert()
        .into('task')
        .values({
          ...createTaskDto,
          due_date: new Date(createTaskDto.due_date),
        })
        .returning('id')
        .execute();

      return { id: newTask.raw[0].id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository
      .createQueryBuilder('task')
      .where('deleted_at = :deleted_at', { deleted_at: false })
      .getMany();
  }

  async findOne(id: number): Promise<{}> {
    const findTask = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.id = :id', { id })
      .andWhere('deleted_at = :deleted_at', { deleted_at: false })
      .getOne();

    if (!findTask) return {};

    return findTask;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<{ id: number }> {
    const findTask = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.id = :id', { id })
      .andWhere('deleted_at = :deleted_at', { deleted_at: false })
      .getOne();
    if (!findTask) throw new NotFoundException('Task with user_id not exists!');

    try {
      this.taskRepository
        .createQueryBuilder()
        .update('task')
        .set({
          ...updateTaskDto,
          due_date: updateTaskDto.due_date
            ? new Date(updateTaskDto.due_date)
            : findTask.due_date,
        })
        .where('id = :id', { id })
        .execute();
      return { id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<{ id: number }> {
    await this.taskRepository
      .createQueryBuilder()
      .update('users')
      .set({ deleted_at: true })
      .where('id = :id', { id })
      .execute();
    return { id };
  }

  async taskWith(): Promise<Task[]> {
    return await this.taskRepository.createQueryBuilder('task').getMany();
  }
}
