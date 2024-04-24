import { Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UsersEntity } from "./users.entity";
import { CoursesEntity } from "./courses.entity";


@Entity({ name: "usercourses" })
export class UserCoursesEntity extends BaseEntity {
    @ManyToOne(() => UsersEntity, (user) => user.courses, { onDelete: "CASCADE" })
    user: UsersEntity

    @ManyToOne(() => CoursesEntity, (course) => course.users, { onDelete: "CASCADE" })
    course: CoursesEntity
}