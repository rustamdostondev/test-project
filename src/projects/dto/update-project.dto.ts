import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

import { IsIn, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class UpdateProjectDto extends PartialType(CreateProjectDto) {

    @IsNumber()
    @IsOptional()
    org_id: number

    @IsNumber()
    @IsOptional()
    created_by: number

}
