import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) {
    }

    async getDashboardStatistics() {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const today = new Date();

        const days = Array.from({length: 7}, (_, i) => {
            const date = new Date(sevenDaysAgo);
            date.setDate(date.getDate() + i + 1);
            return date.toISOString().split('T')[0]; // Получаем YYYY-MM-DD
        });

        const incomeByDay = await this.prisma.payment.groupBy({
            by: ['createdAt'],
            _sum: {amount: true},
            where: {createdAt: {gte: sevenDaysAgo}},
            orderBy: {createdAt: 'asc'},
        });

        const topUpsByDay = await this.prisma.payment.groupBy({
            by: ['createdAt'],
            _count: {_all: true},
            where: {createdAt: {gte: sevenDaysAgo}},
            orderBy: {createdAt: 'asc'},
        });

        const topClients = await this.prisma.payment.groupBy({
            by: ['userId'],
            _sum: {amount: true},
            where: {createdAt: {gte: sevenDaysAgo}},
            orderBy: {_sum: {amount: 'desc'}},
            take: 5,
        });

        const registrationsByDay = await this.prisma.user.groupBy({
            by: ['createdAt'],
            _count: {_all: true},
            where: {createdAt: {gte: sevenDaysAgo}},
            orderBy: {createdAt: 'asc'},
        });

        const totalUsers = await this.prisma.user.count();
        const newUsers = await this.prisma.user.count({
            where: {createdAt: {gte: sevenDaysAgo}},
        });

        const formatSeriesData = (rawData, field) => {
            const map = new Map();
            rawData.forEach((item) => {
                const day = item.createdAt.toISOString().split('T')[0];
                map.set(day, (item[field]?._all || item[field]?.amount) || 0);
            });

            return days.map((day) => map.get(day) || 0);
        };

        const incomeData = formatSeriesData(incomeByDay, '_sum');
        const purchaseData = formatSeriesData(topUpsByDay, '_count');
        const registrationData = formatSeriesData(registrationsByDay, '_count');
        const topClientsData = topClients.map((client) => client._sum.amount || 0);

        return {
            incomeDataSeries: [{name: 'Доходность', data: incomeData}],
            purchaseDataSeries: [{name: 'Покупки', data: purchaseData}],
            registrationDataSeries: [{name: 'Регистрации', data: registrationData}],
            topClientsDataSeries: [{name: 'Покупки', data: topClientsData}],
            newClientsDataSeries: [newUsers, totalUsers - newUsers], // Pie Chart для новых клиентов
        };
    }

    async getAllPayments() {
        const payments = await this.prisma.payment.findMany();
        return payments.map(payment => ({
            id: payment.id,
            orderId: payment.paymentId,
            username: payment.login,
            date: payment.createdAt,
            amount: payment.amount,
            paymentMethod: 'Тинькофф',
            status: payment.status,
            ip: 'unknown',
        }));
    }

    async updateSettings(data) {
        return this.prisma.settings.update({
            where: {id: 1},
            data,
        });
    }

    async getSettings() {
        return this.prisma.settings.findUnique({
            where: {id: 1},
        });
    }

    async createPromoCode(data) {
        return this.prisma.promoCode.create({
            data,
        });
    }
}
