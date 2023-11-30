import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateOrganizationsUserDto } from './dto/create-organizations_user.dto';
import { UpdateOrganizationsUserDto } from './dto/update-organizations_user.dto';
import { OrganizationsUser } from './entities/organizations_user.entity';

@Injectable()
export class OrganizationsUserService {
  constructor(
    @InjectRepository(OrganizationsUser)
    private orgUserRepository: Repository<OrganizationsUser>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) { }

  async create(
    createOrganizationsUserDto: CreateOrganizationsUserDto,
  ): Promise<{ id: number }> {
    try {
      const newUser = await this.orgUserRepository
        .createQueryBuilder()
        .insert()
        .into('organization_user')
        .values({ ...createOrganizationsUserDto })
        .returning('id')
        .execute();

      return { id: newUser.raw[0].id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<OrganizationsUser[]> {
    return await this.orgUserRepository
      .createQueryBuilder('organization_user')
      .where('deleted_at = :deleted_at', { deleted_at: false })
      .getMany();
  }

  async findOne(id: number): Promise<{}> {
    const findUser = this.orgUserRepository
      .createQueryBuilder('organization_user')
      .where('id = :id', { id })
      .andWhere('deleted_at = :deleted_at', { deleted_at: false })
      .getOne();

    if (!findUser) return {};

    return findUser;
  }

  async update(
    id: number,
    updateOrganizationsUserDto: UpdateOrganizationsUserDto,
  ): Promise<{ id: number }> {
    const findUserOrg = await this.findOne(id);
    if (!findUserOrg)
      throw new NotFoundException('OrganizationsUser with user_id not exists!');

    try {
      this.orgUserRepository
        .createQueryBuilder()
        .update('organization_user')
        .set({ ...updateOrganizationsUserDto })
        .where('id = :id', { id })
        .execute();

      return { id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<{ id: number }> {
    await this.orgUserRepository
      .createQueryBuilder()
      .update('organization_user')
      .set({ deleted_at: true })
      .where('id = :id', { id })
      .execute();
    return { id };
  }

  async orgUserWithTask(id: number): Promise<Project[]> {
    return await this.projectRepository.query(`
    select 
     t.status,
     json_agg(ou.*) as "orgUser"
    from task t
    left join organization_user ou
    on t.worker_user_id = ou.id
    group by t.id
    `);
  }
}
