import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { DynamicMessages } from 'src/common/helperServices/dynamic_messages';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly response: DynamicMessages,
  ) {}

  @Post('sign-up')
  async signUp(@Body() payload: UserCreateDto) {
    const user = await this.service.createService(payload);

    return {
      data: user,
      message: this.response.createMessage('User'),
    };
  }

  @Get()
  async findOne(@Body('email') email: string) {
    const data = await this.service.findEmailService(email);
    return {
      data: data,
      message: this.response.fetchedMessage('User'),
    };
  }

  @Get()
  async findOneById(@Body('id') id: string) {
    const data = await this.service.findOneService(id);
    return {
      data: data,
      message: this.response.fetchedMessage('User'),
    };
  }
}
