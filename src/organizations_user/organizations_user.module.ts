import { Module } from '@nestjs/common';
import { OrganizationsUserService } from './organizations_user.service';
import { OrganizationsUserController } from './organizations_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsUser } from './entities/organizations_user.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Project } from 'src/projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationsUser, Task, Project])],
  controllers: [OrganizationsUserController],
  providers: [OrganizationsUserService],
})
export class OrganizationsUserModule {}
