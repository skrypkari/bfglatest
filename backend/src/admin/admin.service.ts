import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStatistics() {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const income = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: { createdAt: { gte: sevenDaysAgo } },
    });

    const topUps = await this.prisma.payment.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    });

    const topUsers = await this.prisma.payment.groupBy({
      by: ['userId'],
      _sum: { amount: true },
      where: { createdAt: { gte: sevenDaysAgo } },
      orderBy: { _sum: { amount: 'desc' } },
      take: 5,
    });

    const newUsers = await this.prisma.user.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    });

    const totalUsers = await this.prisma.user.count();

    return {
      income: income._sum.amount || 0,
      topUps,
      topUsers,
      newUsers,
      oldUsers: totalUsers - newUsers,
    };
  }

  async getAllPayments() {
    return this.prisma.payment.findMany();
  }

  async updateSettings(data) {
    return this.prisma.settings.update({
      where: { id: 1 },
      data,
    });
  }

  async createPromoCode(data) {
    return this.prisma.promoCode.create({
      data,
    });
  }
}
