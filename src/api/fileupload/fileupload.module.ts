import { Module } from '@nestjs/common';
import { UploadController } from './fileupload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesEntity } from 'src/infra/entities/files.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilesEntity])],
  controllers: [UploadController],
  providers: [],
})
export class FileuploadModule { }
