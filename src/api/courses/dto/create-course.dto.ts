import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseDto {
    @ApiProperty({
        example: "Course title"
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        example: "Course description"
    })
    @IsString()
    @IsNotEmpty()
    description: string
}
