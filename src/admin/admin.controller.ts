import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminService } from './admin.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger'; // Swagger import qilingan
import { Response } from 'express';
import { Admin } from './models/admin.model';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from '../decorators/cookie_getter.decorator';
import { AdminGuard } from '../guards/admin.guard';
import { SelfAdminGuard } from '../guards/self.admin.guard';
import { creatorGuard } from '../guards/admin.creator.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "'Yangi foydalanuvchi ro'yxatdan o'tkazish'" }) // Swagger uchun amallar to'g'risidagi izoh
  @ApiResponse({ status: 201, type: Admin }) // Swagger uchun javobning tavsifi
  @Post('signup') // HTTP POST usulini va endpoint manzilini aniqlaydi
  async registration(
    @Body() createAdminDto: CreateAdminDto, // Foydalanuvchi ma'lumotlarini o'z ichiga olgan so'rovnoma
    @Res({ passthrough: true }) res: Response, // Cookie-larni o'rnatish uchun Express Response obyekti
  ) {
    return this.adminService.registration(createAdminDto, res); // Xizmatdan ushbu ro'yhatdan o'tkazish usulini chaqiradi
  }
  @ApiOperation({ summary: 'create Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Login to Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Logout Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(200)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  // @UseGuards(SelfAdminGuard)
  // @UseGuards(creatorGuard)
  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Refresh Token by id Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(200)
  @Post(':id/refresh')
  async refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'find all Admins' })
  @ApiResponse({ status: 200, type: Admin })
  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(SelfAdminGuard)
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'find admin by id' })
  @ApiResponse({ status: 200, type: Admin })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(SelfAdminGuard)
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'update admin by id' })
  @ApiResponse({ status: 201, type: Admin })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }
  
  @UseGuards(SelfAdminGuard)
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete admin by id to Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
