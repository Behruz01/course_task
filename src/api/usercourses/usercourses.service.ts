import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsercourseDto } from './dto/create-usercourse.dto';
import { forUser } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/infra/entities/users.entity';
import { UsersRepo } from 'src/infra/repositories/users.repo';
import { CoursesEntity } from 'src/infra/entities/courses.entity';
import { CoursesRepo } from 'src/infra/repositories/courses.repo';
import { UserCoursesEntity } from 'src/infra/entities/usercourses.entity';
import { UserCoursesRepo } from 'src/infra/repositories/usercourses.repo';

@Injectable()
export class UsercoursesService {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepo,
    @InjectRepository(CoursesEntity) private readonly courseRepo: CoursesRepo,
    @InjectRepository(UserCoursesEntity) private readonly repo: UserCoursesRepo,
  ) { }
  async create(createUsercourseDto: CreateUsercourseDto, req: forUser) {
    try {
      const { id } = req.user
      const { course_id } = createUsercourseDto

      const user = await this.userRepo.findOne({ where: { id } })
      if (!user)
        throw new HttpException("User not found!", HttpStatus.BAD_REQUEST)

      const course = await this.courseRepo.findOne({ where: { id: course_id } })
      if (!course)
        throw new HttpException("Course not found!", HttpStatus.BAD_REQUEST)

      const data = this.repo.create({ course, user })
      await this.repo.save(data)
      return { message: "Usercourse created successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find({ relations: ['user', 'course'] })
      return data
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async mycourses(req: forUser) {
    try {
      const { id } = req.user
      const data = await this.repo.find({ where: { user: { id } }, relations: ['user', 'course'] })
      return data
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async findOne(id: string, req: forUser) {
    try {
      const { id: user_id } = req.user
      const data = await this.repo.findOne({ where: { id, user: { id: user_id } }, relations: ['user', 'course'] })
      if (!data)
        throw new HttpException("Data not found!", HttpStatus.BAD_REQUEST)
      return data
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async remove(id: string, req: forUser) {
    try {
      const { id: user_id } = req.user
      const data = await this.repo.findOne({ where: { id, user: { id: user_id } }, relations: ['user', 'course'] })
      if (!data)
        throw new HttpException("Data not found!", HttpStatus.BAD_REQUEST)
      await this.repo.delete({ id: data.id })
      return { message: "Usercourse deleted successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
