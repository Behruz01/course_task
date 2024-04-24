import { Column, Entity, OneToMany } from "typeorm";
import { UserCoursesEntity } from "./usercourses.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "users" })
export class UsersEntity extends BaseEntity {
    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(() => UserCoursesEntity, (userCourses) => userCourses.user)
    courses: UserCoursesEntity[]
}
