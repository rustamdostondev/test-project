import { IsNumber } from "class-validator"

export class CreateOrganizationsUserDto {

    @IsNumber()
    org_id: number

    @IsNumber()
    user_id: number

    @IsNumber()
    created_by: number
}
