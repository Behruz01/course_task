import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: "admins" })
export class AdminsEntity extends BaseEntity {
    @Column()
    email: string

    @Column()
    password: string

    @Column({ default: 'admin' })
    role: string
}