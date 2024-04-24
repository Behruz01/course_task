import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { CourseFilesEntity } from "./course_files.entity";

@Entity({ name: "files" })
export class FilesEntity extends BaseEntity {
    @Column()
    filename: string

    @Column()
    extension: string

    @Column()
    filesize: number

    @Column()
    filelink: string

    @OneToMany(() => CourseFilesEntity, (courses) => courses.file)
    courses: CourseFilesEntity[]
}