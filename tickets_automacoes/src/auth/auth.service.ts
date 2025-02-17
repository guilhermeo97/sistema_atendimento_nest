import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import BcryptEntity from 'src/utils/bcrypt.entity';
import LoginDto from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptEntity: BcryptEntity,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findByEmail(loginDto.email);
      if (!user) {
        throw new BadRequestException('Email not found');
      }
      const isPasswordMatch = await this.bcryptEntity.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordMatch) {
        throw new BadRequestException('Invalid password');
      }
      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('SECRET'),
        expiresIn: '1H',
      });
      return token;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
