import { Repository } from "typeorm";
import { FilesEntity } from "../entities/files.entity";

export type FilesRepo = Repository<FilesEntity>