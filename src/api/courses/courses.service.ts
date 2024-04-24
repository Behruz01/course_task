import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesEntity } from 'src/infra/entities/courses.entity';
import { CoursesRepo } from 'src/infra/repositories/courses.repo';
import { GetAllDto } from '../files/dto/create-file.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesEntity) private readonly repo: CoursesRepo
  ) { }
  async create(createCourseDto: CreateCourseDto) {
    try {
      const { title, description } = createCourseDto
      const data = this.repo.create({ title, description })
      await this.repo.save(data)
      return { message: "Course created successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(getAllCourseDto: GetAllDto) {
    try {
      const { page = 1, limit = 10 } = getAllCourseDto
      const [files, total] = await this.repo.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['course_files']
      });

      return {
        page,
        limit,
        total,
        files,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.repo.findOne({ where: { id }, relations: ['course_files'] })
      if (!data) throw new HttpException("Data not found!", HttpStatus.BAD_REQUEST);
      return data
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      const data = await this.repo.findOne({ where: { id } })
      if (!data) throw new HttpException("Data not found!", HttpStatus.BAD_REQUEST);
      const { title, description } = updateCourseDto

      await this.repo.update({ id }, { title, description })
      return { message: "Course updated successfully" }
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
      return { message: "Course deleted successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }
}
