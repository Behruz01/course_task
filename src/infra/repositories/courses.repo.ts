import { Repository } from "typeorm";
import { CoursesEntity } from "../entities/courses.entity";

export type CoursesRepo = Repository<CoursesEntity>