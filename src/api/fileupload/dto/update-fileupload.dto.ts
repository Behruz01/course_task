import { PartialType } from '@nestjs/swagger';
import { FileUploadDto } from './create-fileupload.dto';

export class UpdateFileuploadDto extends PartialType(FileUploadDto) { }
