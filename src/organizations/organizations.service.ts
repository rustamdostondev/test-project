import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,

    @Inject(UsersService)
    private usersService: UsersService,
  ) { }

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<{ id: number }> {
    const userFound = await this.usersService.findOne(
      createOrganizationDto.created_by,
    );
    console.log(userFound);
    if (!Object.keys(userFound)[0])
      throw new BadRequestException('created_by id not found');

    try {
      const newOrg = await this.orgRepository
        .createQueryBuilder()
        .insert()
        .into('organization')
        .values({ ...createOrganizationDto })
        .returning('id')
        .execute();

      return { id: newOrg.raw[0].id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Organization[]> {
    return this.orgRepository
      .createQueryBuilder("organization")
      .where("deleted_at = :deleted_at", { deleted_at: false })
      .getMany()
  }

  async findOne(id: number): Promise<{}> {
    const findOrg = await this.orgRepository
      .createQueryBuilder("organization")
      .where("id = :id", { id })
      .andWhere("deleted_at = :deleted_at", { deleted_at: false })
      .getOne()


    if (!findOrg) return {};

    return findOrg;
  }

  async update(
    id: number,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<{ id: number }> {
    const findOrg = await this.findOne(id);
    if (!Object.keys(findOrg)[0])
      throw new NotFoundException('Organization with user_id not exists!');

    const userFound = await this.usersService.findOne(
      updateOrganizationDto.created_by,
    );

    if (!Object.keys(userFound)[0])
      throw new BadRequestException('created_by id not found');

    try {
      this.orgRepository
        .createQueryBuilder()
        .update('organization')
        .set({ ...updateOrganizationDto })
        .where('id = :id', { id })
        .execute();

      return { id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<{ id: number }> {

    await this.orgRepository
      .createQueryBuilder()
      .update('organization')
      .set({ deleted_at: true })
      .where('id = :id', { id })
      .execute();
    return { id };
  }
}
