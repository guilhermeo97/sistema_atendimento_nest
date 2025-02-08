import { ConfigService } from '@nestjs/config';

export const jwtConstants = () => {
  const jwtSecret = new ConfigService();
  return { secret: jwtSecret.get('SECRET') };
};
