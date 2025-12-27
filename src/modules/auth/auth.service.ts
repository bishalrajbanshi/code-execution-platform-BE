import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Prisma, UserDetails } from '@prisma/client';
import * as bcrypt from 'bcrypt';

interface CreateUserPayload {
  fullName: string;
  email: string;
  password?: string;
  googleId?: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async createService(payload: CreateUserPayload): Promise<UserDetails> {
    const existingUser = await this.repository.findEmail(payload.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const prismaPayload: Prisma.UserDetailsCreateInput = {
      fullName: payload.fullName,
      email: payload.email,
    };

    if (payload.password) {
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      prismaPayload.credentialsAuth = {
        create: { password: hashedPassword },
      };
    }
    if (payload.googleId) {
      prismaPayload.googleAuth = {
        create: { googleId: payload.googleId },
      };
    }
    const newUser = await this.repository.create(prismaPayload);

    return newUser;
  }

  async findEmailService(email: string): Promise<UserDetails | null> {
    const user = await this.repository.findEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findOneService(id: string): Promise<UserDetails | null> {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async updateService(
    id: string,
    payload: Partial<Prisma.UserDetailsUpdateInput>,
  ): Promise<UserDetails | null> {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return await this.repository.updateRepository(id, payload);
  }
}
