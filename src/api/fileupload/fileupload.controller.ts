import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileUploadDto } from './dto/create-fileupload.dto';
import { SuperAdminGuard } from 'src/common/guards/superadmin.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesEntity } from 'src/infra/entities/files.entity';
import { FilesRepo } from 'src/infra/repositories/files.repo';

@ApiTags('File Upload')
@Controller('fileupload')
@UseGuards(SuperAdminGuard)
export class UploadController {
  constructor(@InjectRepository(FilesEntity) private readonly repo: FilesRepo) { }
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
            '-' +
            uniqueSuffix +
            '.' +
            file.originalname.split('.').pop(),
          );
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Upload files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @ApiResponse({
    status: 200,
    description: 'Files uploaded successfully',
    type: [String],
  })
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    try {
      const base_url = 'http://localhost:1234/';

      const fileDetails = files.map(file => ({
        filename: file.originalname.split('.')[0],
        extension: file.originalname.split('.').pop(),
        filesize: file.size,
        filelink: base_url + file.filename,
      }));

      for (const detail of fileDetails) {
        const data = this.repo.create({
          filename: detail.filename,
          extension: detail.extension,
          filesize: detail.filesize,
          filelink: detail.filelink,
        });
        await this.repo.save(data);
      }

      return fileDetails;
    } catch (error) {
      return error.message;
    }
  }

}
