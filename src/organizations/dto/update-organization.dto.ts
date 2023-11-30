import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateOrganizationDto } from './create-organization.dto';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {

    @IsString()
    @IsOptional()
    name: string

    @IsNumber()
    @IsOptional()
    created_by: number
}
