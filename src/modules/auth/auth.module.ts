import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { PrismaService } from 'src/config/prisma.service';
import { DynamicMessages } from 'src/common/helperServices/dynamic_messages';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PrismaService, DynamicMessages],
  exports: [],
})
export class AuthModule {}
