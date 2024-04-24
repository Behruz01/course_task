import { Repository } from "typeorm";
import { CourseFilesEntity } from "../entities/course_files.entity";

export type CourseFilesRepo = Repository<CourseFilesEntity>