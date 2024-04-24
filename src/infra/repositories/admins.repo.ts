import { Repository } from "typeorm";
import { AdminsEntity } from "../entities/admins.entity";

export type AdminsRepo = Repository<AdminsEntity>