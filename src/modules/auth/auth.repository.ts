import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { Prisma, UserDetails } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: Prisma.UserDetailsCreateInput): Promise<UserDetails> {
    return this.prisma.userDetails.create({
      data: {
        ...payload,
      },
    });
  }

  async findEmail(email: string): Promise<UserDetails | null> {
    return await this.prisma.userDetails.findUnique({
      where: {
        email,
      },
    });
  }

  async findOne(id: string): Promise<UserDetails | null> {
    return await this.prisma.userDetails.findUnique({
      where: {
        id,
      },
    });
  }

  async updateRepository(
    id: string,
    payload: Prisma.UserDetailsUpdateInput,
  ): Promise<UserDetails | null> {
    return await this.prisma.userDetails.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
  }
}
