import { Repository } from "typeorm";
import { UserCoursesEntity } from "../entities/usercourses.entity";

export type UserCoursesRepo = Repository<UserCoursesEntity>