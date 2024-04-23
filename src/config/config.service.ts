import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT', 1234);
  }

  get postgresUrl(): string {
    return this.configService.get<string>('POSTGRES_URL');
  }

  get jwtSecretKey(): string {
    return this.configService.get<string>('JWT_SECRET_KEY');
  }

  get emailHost(): string {
    return this.configService.get<string>('EMAIL_HOST');
  }

  get emailPort(): number {
    return this.configService.get<number>('EMAIL_PORT');
  }

  get emailSecure(): boolean {
    return this.configService.get<boolean>('EMAIL_SECURE');
  }

  get emailUser(): string {
    return this.configService.get<string>('EMAIL_USER');
  }

  get emailPassword(): string {
    return this.configService.get<string>('EMAIL_PASSWORD');
  }

  get emailFrom(): string {
    return this.configService.get<string>('EMAIL_FROM');
  }
}
