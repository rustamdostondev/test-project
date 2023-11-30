import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizationsUserService } from './organizations_user.service';
import { CreateOrganizationsUserDto } from './dto/create-organizations_user.dto';
import { UpdateOrganizationsUserDto } from './dto/update-organizations_user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('organizationsUser')
@Controller('organizations-user')
export class OrganizationsUserController {
  constructor(
    private readonly organizationsUserService: OrganizationsUserService,
  ) {}

  @Post()
  create(@Body() createOrganizationsUserDto: CreateOrganizationsUserDto) {
    return this.organizationsUserService.create(createOrganizationsUserDto);
  }

  @Get()
  findAll() {
    return this.organizationsUserService.findAll();
  }

  @Get('/get:id')
  findOne(@Param('id') id: string) {
    return this.organizationsUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationsUserDto: UpdateOrganizationsUserDto,
  ) {
    return this.organizationsUserService.update(
      +id,
      updateOrganizationsUserDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationsUserService.remove(+id);
  }

  @Get('/orgUserWithTask:id')
  orgUserWithTask(@Param('id') id: string) {
    return this.organizationsUserService.orgUserWithTask(+id);
  }
}
