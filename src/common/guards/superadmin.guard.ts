import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class SuperAdminGuard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      try {
        const request = context.switchToHttp().getRequest();
  
        const { role } = request.user.user;
  
        if (role !== 'superAdmin') return false;
  
        return true;
      } catch (error) {
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  