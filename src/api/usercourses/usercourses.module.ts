import { Module } from '@nestjs/common';
import { UsercoursesService } from './usercourses.service';
import { UsercoursesController } from './usercourses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesEntity } from 'src/infra/entities/courses.entity';
import { UsersEntity } from 'src/infra/entities/users.entity';
import { UserCoursesEntity } from 'src/infra/entities/usercourses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesEntity, UsersEntity, UserCoursesEntity])],
  controllers: [UsercoursesController],
  providers: [UsercoursesService],
})
export class UsercoursesModule { }
