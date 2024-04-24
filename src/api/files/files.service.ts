import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetAllDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesEntity } from 'src/infra/entities/files.entity';
import { FilesRepo } from 'src/infra/repositories/files.repo';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(@InjectRepository(FilesEntity) private readonly repo: FilesRepo) { }
  async findAll(getAllFileDto: GetAllDto) {
    try {
      const { page = 1, limit = 10 } = getAllFileDto
      const [files, total] = await this.repo.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        page,
        limit,
        total,
        files,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.repo.findOne({ where: { id }, relations: ['courses'] })
      if (!data) throw new HttpException("Data not found!", HttpStatus.BAD_REQUEST);
      return data
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    try {
      const { filename } = updateFileDto
      const data = await this.repo.findOne({ where: { id }, relations: ['courses'] })
      if (!data) throw new HttpException("Data not found!", HttpStatus.BAD_REQUEST);
      await this.repo.update({ id }, { filename })
      return { message: "Filename updated successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.repo.findOne({ where: { id }, relations: ['courses'] })
      if (!data) throw new HttpException("Data not found!", HttpStatus.BAD_REQUEST);
      await this.repo.delete({ id })
      return { message: "File deleted successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async download(id: string, res: Response) {
    try {
      const data = await this.repo.findOne({ where: { id } });

      if (!data) {
        throw new HttpException("Data not found!", HttpStatus.BAD_REQUEST);
      }

      const filePath = path.resolve(data.filelink);

      if (!fs.existsSync(filePath)) {
        throw new HttpException('File not found!', HttpStatus.NOT_FOUND);
      }

      res.download(filePath);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }
}
