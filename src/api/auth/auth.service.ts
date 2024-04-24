import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto, LogoutDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/infra/entities/users.entity';
import { UsersRepo } from 'src/infra/repositories/users.repo';
import { AdminsEntity } from 'src/infra/entities/admins.entity';
import { AdminsRepo } from 'src/infra/repositories/admins.repo';
import * as bcrypt from "bcrypt"
import { MyConfigService } from 'src/config/config.service';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { createClient } from "redis"
import { Request } from 'express';
interface userObject {
  id: string
}

interface ExtendedJwtPayload extends JwtPayload {
  id: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepo: UsersRepo,
    @InjectRepository(AdminsEntity) private readonly adminRepo: AdminsRepo,
    private configService: MyConfigService,
  ) { }
  createAccessToken(user: userObject) {
    return jwt.sign({ user }, this.configService.jwtSecretKey, {
      expiresIn: "10m",
    });
  }

  async createRefreshToken(user: Object) {
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();

    const refreshToken = jwt.sign({ user }, this.configService.jwtSecretKey, {
      expiresIn: '10h',
    });

    const payload = jwt.verify(refreshToken, this.configService.jwtSecretKey) as ExtendedJwtPayload;
    const key = `${payload.id}:refreshToken`;

    await client.set(key, refreshToken, { EX: 86400 });

    await client.disconnect();

    return refreshToken;
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto
      const findUser = await this.userRepo.findOne({ where: { email } })
      if (!findUser) {
        const hashedPass = await bcrypt.hash(password, 12);
        const newUser = this.userRepo.create({ email, password: hashedPass });
        await this.userRepo.save(newUser);
        const accessToken = this.createAccessToken(newUser)
        const refreshToken = await this.createRefreshToken(newUser)
        return { accessToken, refreshToken };
      }

      const verifyPass = await bcrypt.compare(password, findUser.password);
      if (!verifyPass) {
        throw new HttpException("Invalid password", HttpStatus.BAD_REQUEST);
      }

      const accessToken = this.createAccessToken(findUser)
      const refreshToken = await this.createRefreshToken(findUser)
      return { accessToken, refreshToken };
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async logout(logoutDto: LogoutDto) {
    try {
      const { refreshToken } = logoutDto
      const client = createClient();
      client.on('error', (err) => console.log('Redis Client Error', err));
      await client.connect();

      if (!refreshToken) {
        throw new HttpException('Token is required for logout', HttpStatus.BAD_REQUEST);
      }

      const payload = jwt.verify(refreshToken, this.configService.jwtSecretKey) as ExtendedJwtPayload;

      const userId = payload.id;

      const key = `${userId}:refreshToken`;
      const redisResult = await client.del(key);

      if (redisResult === 0) {
        throw new HttpException('Failed to remove token from Redis', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      await client.disconnect();

      return { message: 'Logout successful' };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }


  async refresh(req: Request) {
    try {
      const refreshToken = req.body.refreshToken;

      if (!refreshToken) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const client = createClient();
      client.on('error', (err) => console.log('Redis Client Error', err));
      await client.connect();

      const payload = jwt.verify(refreshToken, this.configService.jwtSecretKey) as ExtendedJwtPayload;

      const key = `${payload.id}:refreshToken`;

      const storedToken = await client.get(key);

      if (!storedToken || storedToken !== refreshToken) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const newAccessToken = this.createAccessToken(payload.user);

      await client.disconnect();

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.BAD_REQUEST);
    }
  }

  async adminLogin(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto

      const hashPass = await bcrypt.hash(password, 12);
      if (email == 'ibragimovbekhruz4@gmail.com' && password == 'superadmin') {
        const findSuperAdmin = await this.adminRepo.findOne({
          where: { email },
        });
        if (!findSuperAdmin) {
          const superAdmin = this.adminRepo.create({
            email,
            password: hashPass,
            role: 'superAdmin',
          });
          await this.adminRepo.save(superAdmin);
        }
      }

      const findAdmin = await this.adminRepo.findOne({ where: { email } })
      if (!findAdmin) throw new HttpException("Admin not found!", HttpStatus.BAD_REQUEST)

      const verifyPass = await bcrypt.compare(password, findAdmin.password);
      if (!verifyPass) {
        throw new HttpException("Invalid password", HttpStatus.BAD_REQUEST);
      }

      const accessToken = this.createAccessToken(findAdmin)
      const refreshToken = await this.createRefreshToken(findAdmin)
      return { accessToken, refreshToken };
    } catch (error) {
      throw new HttpException(error.message, error.status ||
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
