import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto, GetAllFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesEntity } from 'src/infra/entities/files.entity';
import { FilesRepo } from 'src/infra/repositories/files.repo';

@Injectable()
export class FilesService {
  constructor(@InjectRepository(FilesEntity) private readonly repo: FilesRepo) { }
  async create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async findAll(getAllFileDto: GetAllFileDto) {
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
}
