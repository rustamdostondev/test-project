import { IsIn, IsNumber, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(3, 100)
    name: string;

    @IsString()
    @IsIn(['admin', 'leader', 'employee'])
    role: string;

    @IsNumber()
    created_by: number
}
