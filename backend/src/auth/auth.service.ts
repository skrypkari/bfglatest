import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        role: 'user',
      },
    });
    const { passwordHash: _, ...result } = user;
    return {
      ...result,
      accessToken: this.jwtService.sign({ sub: user.id, role: user.role }),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { email: string; password: string }) {
    const userResult = await this.validateUser(user.email, user.password);
    if (userResult !== null) {
      const payload = { sub: userResult.id, role: userResult.role };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    return null;
  }

  async createAnonymousToken() {
    const payload = { role: 'anonymous' };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
    };
  }

  async validateToken(token: string) {
    try {
      console.log(123123);
      const result = this.jwtService.verify(token);
      console.log('token: ', token, 'result: ', result);
      return result;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid Token.');
    }
  }

  async createAdmin() {
    const user = await this.prisma.user.create({
      data: {
        email: 'test@test.com',
        passwordHash: await bcrypt.hash('test', 10),
        role: 'admin',
      },
    });
    const { passwordHash: _, ...result } = user;
  }
}
