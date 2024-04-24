import { Module } from '@nestjs/common';
import { CoursefilesService } from './coursefiles.service';
import { CoursefilesController } from './coursefiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesEntity } from 'src/infra/entities/courses.entity';
import { FilesEntity } from 'src/infra/entities/files.entity';
import { CourseFilesEntity } from 'src/infra/entities/course_files.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesEntity, FilesEntity, CourseFilesEntity])],
  controllers: [CoursefilesController],
  providers: [CoursefilesService],
})
export class CoursefilesModule { }
