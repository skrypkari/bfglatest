import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { AdminService } from './admin.service';
import { CreatePromoCodeDto } from './dto/create-promocode.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  getDashboardStatistics() {
    return this.adminService.getDashboardStatistics();
  }

  @Get('payments')
  getAllPayments() {
    return this.adminService.getAllPayments();
  }

  @Put('settings')
  updateSettings(@Body() settingsDto: UpdateSettingsDto) {
    return this.adminService.updateSettings(settingsDto);
  }

  @Post('promocode')
  createPromoCode(@Body() promoCodeDto: CreatePromoCodeDto) {
    return this.adminService.createPromoCode(promoCodeDto);
  }
}
