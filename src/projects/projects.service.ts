import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Inject } from '@nestjs/common/decorators'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    @Inject(OrganizationsService)
    private projectRepository: Repository<Project>,
    private orgService: OrganizationsService,
  ) { }

  async create(createProjectDto: CreateProjectDto) {
    try {
      const orgIdValid = await this.orgService.findOne(createProjectDto.created_by)
      if (!Object.keys(orgIdValid)[0]) throw new BadRequestException("Org_id not found!")

      const newPro = await this.projectRepository
        .createQueryBuilder()
        .insert()
        .into('projects')
        .values({ ...createProjectDto })
        .returning('id')
        .execute();

      return { id: newPro.raw[0].id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository
      .createQueryBuilder('projects')
      .where('deleted_at = :deleted_at', { deleted_at: false })
      .getMany()
      ;
  }

  async findOne(id: number): Promise<{}> {
    const findPro = await this.projectRepository
      .createQueryBuilder('projects')
      .where('projects.id = :id', { id })
      .andWhere('deleted_at = :deleted_at', { deleted_at: false })
      .getOne();
    if (!findPro) return {};

    return findPro;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<{ id: number }> {
    const findPro = await this.findOne(id);
    if (!findPro)
      throw new NotFoundException('Project with procet_id not exists!');

    try {
      this.projectRepository
        .createQueryBuilder()
        .update('projects')
        .set({ ...updateProjectDto })
        .where('id = :id', { id })
        .execute();

      return { id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<{ id: number }> {
    const projectValid = await this.findOne(id);
    if (!Object.keys(projectValid)[0])
      throw new BadRequestException('projectId not found!');

    await this.projectRepository
      .createQueryBuilder()
      .update('projects')
      .set({ deleted_at: true })
      .where('id = :id', { id })
      .execute();
    return { id };
  }

  async projectWithTask() {
    return await this.projectRepository.query(`
    select 
    p.id,
    p.org_id,
    p.created_by,
    json_agg(ou.*) as orgUser,
    json_agg(t.*) as task
    from 
    projects p 
    left join task t 
    on p.id = t.project_id
    left join organization_user ou
    on t.worker_user_id = ou.id
    group by p.id
    `);
  }
}
