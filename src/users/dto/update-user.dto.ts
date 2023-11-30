import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @Length(3, 100)
    @IsOptional()
    name: string;

    @IsString()
    @IsIn(['admin', 'leader', 'employee'])
    @IsOptional()
    role: string;

    @IsNumber()
    @IsOptional()
    created_by: number
}
