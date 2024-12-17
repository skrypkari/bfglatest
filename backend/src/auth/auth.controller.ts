import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: { email: string; password: string }) {
    return this.authService.register(
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto);
  }

  @Get('anonymous')
  async getAnonymousToken() {
    return this.authService.createAnonymousToken();
  }

  @Get('create-admin')
  async createAdmin() {
    return this.authService.createAdmin();
  }

  @Get('validate')
  async validateToken(@Headers('Authorization') token: string) {
    return this.authService.validateToken(token);
  }
}
