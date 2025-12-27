import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TokenService {
  constructor(
    private readonly ConfigService: ConfigService,
    private readonly JwtService: JwtService,
  ) {}

  async createToken(payload: JwtPayload) {
    const accessToken = await this.JwtService.signAsync(payload, {
      secret: this.ConfigService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: this.ConfigService.get('ACCESS_TOKEN_EXPIRATION'),
    });
    const refreshToken = await this.JwtService.signAsync(payload, {
      secret: this.ConfigService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.ConfigService.get('REFRESH_TOKEN_EXPIRATION'),
    });
    return {
      accessToken,
      refreshToken,
    };
  }

}

