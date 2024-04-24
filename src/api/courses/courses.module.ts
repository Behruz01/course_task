import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesEntity } from 'src/infra/entities/courses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesEntity])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule { }
