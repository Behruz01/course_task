import { PartialType } from '@nestjs/swagger';
import { CreateCoursefileDto } from './create-coursefile.dto';

export class UpdateCoursefileDto extends PartialType(CreateCoursefileDto) {}
