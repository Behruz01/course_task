import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/infra/entities/users.entity';
import { UsersRepo } from 'src/infra/repositories/users.repo';
export interface forUser extends Request {
  user?: {
    id: string
  }
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private readonly repo: UsersRepo
  ) { }

  async myInfo(req: forUser) {
    try {
      const { id } = req.user
      const data = await this.repo.findOne({ where: { id }, relations: ['courses'] })

      return data
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find()
      return data
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.BAD_REQUEST
      )
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
}
