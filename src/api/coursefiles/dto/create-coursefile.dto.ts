import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateCoursefileDto {
    @IsUUID()
    @IsNotEmpty()
    course_id: string

    @IsUUID()
    @IsNotEmpty()
    file_id: string
}
