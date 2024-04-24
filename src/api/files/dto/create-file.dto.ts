import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFileDto {
    @ApiProperty({
        example: "Examplename"
    })
    @IsString()
    @IsNotEmpty()
    filename: string
}

export class GetAllDto {
    @ApiProperty({
        example: 1
    })
    @IsNumber()
    @IsOptional()
    page: number

    @ApiProperty({
        example: 10
    })
    @IsNumber()
    @IsOptional()
    limit: number
}