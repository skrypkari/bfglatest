import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('initiate')
  async initiatePayment(
    @Body() data: { amount: number; login: string },
    @Request() req,
  ) {
    const userId = req.user?.userId || null;
    return this.paymentService.initiatePayment(data.amount, data.login, userId);
  }

  @Post('webhook')
  async handleWebhook(@Body() webhookData: any) {
    return this.paymentService.handleWebhook(webhookData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status/:id')
  async getPaymentStatus(@Param('id') id: number, @Request() req) {
    const userId = req.user?.userId || null;
    return this.paymentService.getPaymentStatus(id, userId);
  }
}
