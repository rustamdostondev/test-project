import { IsNumber, IsString } from "class-validator";

export class CreateOrganizationDto {

    @IsString()
    name: string

    @IsNumber()
    created_by: number

}
