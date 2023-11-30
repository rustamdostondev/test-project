import { IsIn, IsNumber, IsString, Length } from "class-validator";

export class updateRoleUser {

    @IsString()
    @IsIn(['admin', 'leader', 'employee'])
    role: string;

}
