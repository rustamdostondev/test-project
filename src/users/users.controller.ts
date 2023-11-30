import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'utils/roles/roles.decorator';
import { Role } from 'utils/roles/role.enum';
import { User } from './entities/user.entity';
import { RolesGuard } from 'utils/roles/roles.guard';
import { updateRoleUser } from './dto/update-roleuser.dto';

@ApiTags('users')
// @UseGuards(RolesGuard)
@Controller('users')
@Roles(Role.Admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<{ id: number }> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{}> {
    return this.usersService.findOne(+id);
  }

  @Patch('/allPatch:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ id: number }> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ id: number }> {
    return this.usersService.remove(+id);
  }

  @Patch('/updateUserRole:id')
  updateUserRole(
    @Param('id') id: string,
    @Body() updateUserDto: updateRoleUser,
  ): Promise<{ id: number }> {
    return this.usersService.updateUserRole(+id, updateUserDto);
  }
}
