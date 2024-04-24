import { PartialType } from '@nestjs/swagger';
import { CreateUsercourseDto } from './create-usercourse.dto';

export class UpdateUsercourseDto extends PartialType(CreateUsercourseDto) {}
