import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateCoursefileDto {
    @ApiProperty({
        example: "UUID"
    })
    @IsUUID()
    @IsNotEmpty()
    course_id: string

    @ApiProperty({
        example: "UUID"
    })
    @IsUUID()
    @IsNotEmpty()
    file_id: string
}
