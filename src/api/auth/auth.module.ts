import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersEntity } from 'src/infra/entities/users.entity';
import { AdminsEntity } from 'src/infra/entities/admins.entity';
import { MyConfigModule } from 'src/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyConfigService } from 'src/config/config.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, AdminsEntity])],
  controllers: [AuthController],
  providers: [AuthService, MyConfigService],
})
export class AuthModule { }
