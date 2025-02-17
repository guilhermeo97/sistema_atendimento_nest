import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromCookie(request);
      if (!token) {
        throw new BadRequestException('Token not found');
      }
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('SECRET'),
      });
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }
  private extractTokenFromCookie(request: Request) {
    if (!request || !request.headers.cookie) {
      return null;
    }
    const cookies = request.headers.cookie.split(';');
    const token = cookies.find((cookie) => cookie.trim().startsWith('token='));
    if (!token) {
      return null;
    }
    return token.split('=')[1];
  }
}
