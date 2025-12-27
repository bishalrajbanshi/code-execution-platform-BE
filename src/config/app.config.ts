import { ConfigModuleOptions } from '@nestjs/config';
import jwtConfig from './jwt.config';

export const appConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
  load: [
    jwtConfig
  ],
};
