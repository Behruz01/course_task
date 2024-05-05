import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { AdminsEntity } from 'src/infra/entities/admins.entity';
import { AdminsRepo } from 'src/infra/repositories/admins.repo';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminsEntity) private readonly adminRepo: AdminsRepo,
  ) { }
  async create(createAdminDto: CreateAdminDto) {
    try {
      const { email, password } = createAdminDto;

      const findAdmin = await this.adminRepo.findOne({ where: { email } });
      if (findAdmin) throw new HttpException("Admin already exists!", HttpStatus.CONFLICT);

      const hashPass = await bcrypt.hash(password, 12);

      const data = this.adminRepo.create({
        email,
        password: hashPass,
      });
      await this.adminRepo.save(data);
      return { message: 'Created admin successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const data = await this.adminRepo.find({ where: { role: 'admin' } });
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const findAdmin = await this.adminRepo.findOne({ where: { id } });
      if (!findAdmin) throw new HttpException("Admin not found!", HttpStatus.BAD_REQUEST);

      const data = this.adminRepo.findOne({ where: { id } });
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      const findAdmin = await this.adminRepo.findOne({ where: { id } });
      if (!findAdmin) throw new HttpException("Admin not found!", HttpStatus.BAD_REQUEST);

      const { email, password } = updateAdminDto;

      let updatedData: Partial<UpdateAdminDto> = { email };

      if (password) {
        const hashPass = await bcrypt.hash(password, 12);
        updatedData = { ...updatedData, password: hashPass };
      }

      await this.adminRepo.update({ id }, updatedData);
      return { message: 'Updated admin successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const findAdmin = await this.adminRepo.findOne({ where: { id } });
      if (!findAdmin) throw new HttpException("Admin not found!", HttpStatus.BAD_REQUEST);
      await this.adminRepo.delete({ id });
      return { message: 'Deleted admin successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }
}
