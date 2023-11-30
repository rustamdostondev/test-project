import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { updateRoleUser } from './dto/update-roleuser.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ id: number }> {
    const oneUser = await this.findOne(createUserDto.created_by);
    // if (!Object.keys(oneUser)[0])
    //   throw new BadRequestException('created_by not found');
    try {
      const newUser = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into('users')
        .values({ ...createUserDto })
        .returning('id')
        .execute();

      return { id: newUser.raw[0].id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('users')
      .where('deleted_at = :deleted_at', { deleted_at: false })
      .getMany();
  }

  async findOne(id: number): Promise<{}> {
    const findUser = await this.userRepository
      .createQueryBuilder('user')
      .where('id = :id', { id })
      .andWhere('deleted_at = :deleted_at', { deleted_at: false })
      .getOne();
    if (!findUser) return {};
    return findUser;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<{ id: number }> {
    const findUser = this.findOne(id);
    const findCreatedBy = this.findOne(updateUserDto.created_by);
    if (!Object.keys(findCreatedBy)[0])
      throw new BadRequestException('created_by not found');
    else if (!Object.keys(findUser)[0])
      throw new NotFoundException('User with user_id not exists!');
    try {
      await this.userRepository
        .createQueryBuilder()
        .update('users')
        .set({ ...updateUserDto })
        .where('id = :id', { id })
        .execute();

      return { id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<{ id: number }> {
    const userFound = await this.findOne(id);
    if (!Object.keys(userFound)[0])
      throw new BadRequestException('userId not found');

    await this.userRepository
      .createQueryBuilder()
      .update('users')
      .set({ deleted_at: true })
      .where('id = :id', { id })
      .execute();
    return { id };

  }

  async updateUserRole(
    id: number,
    updateUserDto: updateRoleUser,
  ): Promise<{ id: number }> {
    const findUser = await this.findOne(id);
    if (!findUser) throw new NotFoundException('User id not found');

    try {
      await this.userRepository
        .createQueryBuilder()
        .update('users')
        .set({ ...updateUserDto })
        .where('id = :id', { id })
        .andWhere('deleted_at = :deleted_at', { deleted_at: false })
        .execute();
      return { id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
