import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateOrganizationsUserDto } from './create-organizations_user.dto';

export class UpdateOrganizationsUserDto extends PartialType(CreateOrganizationsUserDto) {
    @IsNumber()
    @IsOptional()
    org_id: number

    @IsNumber()
    @IsOptional()
    user_id: number

    @IsNumber()
    @IsOptional()
    created_by: number
}
