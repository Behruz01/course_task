import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MyConfigModule } from './config/config.module';
import { AuthModule } from './api/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AdminsEntity } from './infra/entities/admins.entity';
import { CoursesEntity } from './infra/entities/courses.entity';
import { CourseFilesEntity } from './infra/entities/course_files.entity';
import { FilesEntity } from './infra/entities/files.entity';
import { UsersEntity } from './infra/entities/users.entity';
import { UserCoursesEntity } from './infra/entities/usercourses.entity';
import { AuthMiddleware } from './common/middlewares/tokenchecker.middleware';
import { AdminsModule } from './api/admins/admins.module';
import { FileuploadModule } from './api/fileupload/fileupload.module';
import { FilesModule } from './api/files/files.module';
import { CoursesModule } from './api/courses/courses.module';
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 3,
      },
    ]),

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '10m'),
        },
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('POSTGRES_URL'),
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true),
        logging: configService.get<boolean>('DB_LOGGING', false),
        autoLoadEntities: true,
        entities: [AdminsEntity, CoursesEntity, FilesEntity,
          CourseFilesEntity, UsersEntity, UserCoursesEntity],
      }),
    }),
    ConfigModule,
    MyConfigModule,
    AuthModule,
    AdminsModule,
    FileuploadModule,
    FilesModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/adminlogin', method: RequestMethod.POST },
        { path: '/auth/refresh-token', method: RequestMethod.POST },
        { path: '/files/download/', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
