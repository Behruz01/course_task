import { Module } from '@nestjs/common';
import { AdminService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsEntity } from 'src/infra/entities/admins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminsEntity])],
  controllers: [AdminsController],
  providers: [AdminService],
})
export class AdminsModule { }
