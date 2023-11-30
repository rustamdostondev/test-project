import { IsIn, IsNumber, IsString, Length } from "class-validator";

export class CreateProjectDto {

    @IsNumber()
    org_id: number

    @IsNumber()
    created_by: number
}
