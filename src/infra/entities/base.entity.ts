import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid"

@Entity({ name: "Base" })
export class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Generated("uuid")
    id: string

    @Column({
        name: "created_at",
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date

    @Column({
        name: "updated_at",
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date

    constructor() {
        this.id = uuidv4()
    }
}