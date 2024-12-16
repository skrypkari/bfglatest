import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  private commissionRate = 0.16;

  async initiatePayment(amount: number, login: string, userId: number | null) {
    const finalAmount = amount + amount * this.commissionRate;
    const paymentId = uuidv4();

    const payment = await this.prisma.payment.create({
      data: {
        userId,
        amount: finalAmount,
        login,
        status: 'new',
        paymentId,
      },
    });

    const paymentUrl = await this.createTinkoffPayment(payment.id, finalAmount);

    return { paymentUrl };
  }

  async createTinkoffPayment(paymentId: number, amount: number) {
    const response = await lastValueFrom(
      this.httpService.post('https://securepay.tinkoff.ru/v2/Init', {
        // Параметры запроса к Tinkoff API
      }),
    );

    if (response.data && response.data.PaymentURL) {
      return response.data.PaymentURL;
    } else {
      throw new HttpException(
        'Payment initiation failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async handleWebhook(webhookData: any) {
    const paymentId = webhookData.PaymentId;
    const status = webhookData.Status;

    await this.prisma.payment.update({
      where: { id: paymentId },
      data: { status },
    });

    if (status === 'CONFIRMED') {
      await this.prisma.taskQueue.create({
        data: {
          paymentId,
          status: 'pending',
        },
      });
    }

    return { message: 'Webhook processed' };
  }

  async getPaymentStatus(id: number, userId: number | null) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    if (payment.userId !== userId) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    return { status: payment.status };
  }

  async processTaskQueue() {
    const tasks = await this.prisma.taskQueue.findMany({
      where: { status: 'pending' },
    });

    for (const task of tasks) {
      try {
        await this.topUpSteam(task.paymentId);

        await this.prisma.taskQueue.update({
          where: { id: task.id },
          data: { status: 'success' },
        });
        await this.prisma.payment.update({
          where: { id: task.paymentId },
          data: { status: 'confirmed' },
        });
      } catch (error) {
        await this.prisma.taskQueue.update({
          where: { id: task.id },
          data: { status: 'error' },
        });
      }
    }
  }

  async topUpSteam(paymentId: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    const playWalletData = {
      amount: payment.amount,
      login: payment.login,
    };

    const response = await lastValueFrom(
      this.httpService.post(
        'https://api.playwallet.com/topup',
        playWalletData,
        {
          headers: {
            Authorization: `Bearer ${process.env.PLAYWALLET_API_KEY}`,
          },
        },
      ),
    );

    if (response.data && response.data.success) {
      return true;
    } else {
      throw new Error('Top-up failed');
    }
  }
}
