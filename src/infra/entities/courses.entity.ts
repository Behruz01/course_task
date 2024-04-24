import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { CourseFilesEntity } from "./course_files.entity";
import { UserCoursesEntity } from "./usercourses.entity";


@Entity({ name: "courses" })
export class CoursesEntity extends BaseEntity {
    @Column()
    title: string

    @Column()
    description: string

    @OneToMany(() => CourseFilesEntity, (courseFile) => courseFile.course)
    course_files: CourseFilesEntity[]

    @OneToMany(() => UserCoursesEntity, (userCourse) => userCourse.course)
    users: UserCoursesEntity[]
}