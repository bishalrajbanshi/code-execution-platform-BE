import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';


@Module({
  imports: [
    ConfigModule.forRoot(appConfig),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
