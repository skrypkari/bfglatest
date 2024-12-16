import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma.service';
import { PaymentController } from './payment.controller';
import { PaymentProcessor } from './payment.processor';
import { PaymentService } from './payment.service';

@Module({
  imports: [AuthModule, HttpModule, ScheduleModule.forRoot()],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentProcessor, PrismaService],
})
export class PaymentModule {}
