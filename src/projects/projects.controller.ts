import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { Project } from './entities/project.entity';
import { Role } from 'utils/roles/role.enum';
import { Roles } from 'utils/roles/roles.decorator';
import { RolesGuard } from 'utils/roles/roles.guard';

// @UseGuards(RolesGuard)
// @Roles(Role.Leader)
@ApiTags("projects")
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<{ id: number }> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get('/get:id')
  findOne(@Param('id') id: string): Promise<{}> {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto): Promise<{ id: number }> {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ id: number }> {
    return this.projectsService.remove(+id);
  }

  @Get("projectWithTask")
  projectWithTask(): Promise<Project[]> {
    return this.projectsService.projectWithTask();
  }
}
