import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateUsercourseDto {
    @ApiProperty({
        example: "UUID"
    })
    @IsUUID()
    @IsNotEmpty()
    course_id: string
}
