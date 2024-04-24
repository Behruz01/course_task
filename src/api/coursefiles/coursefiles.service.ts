import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCoursefileDto } from './dto/create-coursefile.dto';
import { UpdateCoursefileDto } from './dto/update-coursefile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesEntity } from 'src/infra/entities/courses.entity';
import { CoursesRepo } from 'src/infra/repositories/courses.repo';
import { FilesEntity } from 'src/infra/entities/files.entity';
import { FilesRepo } from 'src/infra/repositories/files.repo';
import { CourseFilesEntity } from 'src/infra/entities/course_files.entity';
import { CourseFilesRepo } from 'src/infra/repositories/course_files.repo';

@Injectable()
export class CoursefilesService {
  constructor(
    @InjectRepository(CoursesEntity) private readonly courseRepo: CoursesRepo,
    @InjectRepository(FilesEntity) private readonly fileRepo: FilesRepo,
    @InjectRepository(CourseFilesEntity) private readonly repo: CourseFilesRepo,
  ) { }
  async create(createCoursefileDto: CreateCoursefileDto) {
    try {
      const { course_id, file_id } = createCoursefileDto
      const course = await this.courseRepo.findOne({ where: { id: course_id } })
      if (!course)
        throw new HttpException("Course not found!", HttpStatus.BAD_REQUEST)
      const file = await this.fileRepo.findOne({ where: { id: file_id } })
      if (!file)
        throw new HttpException("File not found!", HttpStatus.BAD_REQUEST)

      const data = this.repo.create({ course, file })
      await this.repo.save(data)
      return { message: "Coursefile created successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find({ relations: ['course', 'file'] })
      return data
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.repo.findOne({ where: { id }, relations: ['course', 'file'] })
      if (!data) throw new HttpException("Data not found!", HttpStatus.BAD_REQUEST);
      return data
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateCoursefileDto: UpdateCoursefileDto) {
    try {
      const { course_id, file_id } = updateCoursefileDto
      const course = await this.courseRepo.findOne({ where: { id: course_id } })
      if (!course)
        throw new HttpException("Course not found!", HttpStatus.BAD_REQUEST)
      const file = await this.fileRepo.findOne({ where: { id: file_id } })
      if (!file)
        throw new HttpException("File not found!", HttpStatus.BAD_REQUEST)

      await this.repo.update({ id }, { course, file })
      return { message: "Coursefile updated successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.repo.findOne({ where: { id } })
      if (!data) throw new HttpException("Data not found!", HttpStatus.BAD_REQUEST);
      await this.repo.delete({ id })
      return { message: "Coursefile deleted successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }
}
