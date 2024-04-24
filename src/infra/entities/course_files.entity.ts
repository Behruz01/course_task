import { Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { CoursesEntity } from "./courses.entity";
import { FilesEntity } from "./files.entity";

@Entity({ name: "coursefiles" })
export class CourseFilesEntity extends BaseEntity {
    @ManyToOne(() => CoursesEntity, (course) => course.course_files, { onDelete: 'CASCADE' })
    course: CourseFilesEntity

    @ManyToOne(() => FilesEntity, (file) => file.courses, { onDelete: "CASCADE" })
    file: FilesEntity
}