import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFileDto {
    @IsString()
    @IsNotEmpty()
    filename: string
}

export class GetAllDto {
    @IsNumber()
    @IsOptional()
    page: number

    @IsNumber()
    @IsOptional()
    limit: number
}