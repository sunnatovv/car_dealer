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
// import { PatientsService } from './patients.service';
// import { CreatePatientDto } from './dto/create-patient.dto';
// import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
// import { LoginPatientDto } from './dto/login-patient.dto';
// import { Patient } from './models/patient.model';
import { CookieGetter } from '../decorators/cookie_getter.decorator';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import { SelfUserGuard } from '../guards/self.user.guard';
import { ClientsService } from './clients.service';
import { Client } from './models/client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { LoginClientDto } from './dto/login-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly patientsService: ClientsService) {}

  @ApiOperation({ summary: 'Register a patient' })
  @ApiResponse({ status: 201, type: Client })
  @Post('signup')
  registration(
    @Body() createPatientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.patientsService.registration(createPatientDto, res);
  }

  @ApiOperation({ summary: 'Activate a patient account' })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.patientsService.activate(link);
  }

  @ApiOperation({ summary: 'Login for a patient' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @Post('login')
  login(
    @Body() loginPatientDto: LoginClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.patientsService.login(loginPatientDto, res);
  }

  @UseGuards(SelfUserGuard)
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Logout for a patient' })
  @HttpCode(200)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.patientsService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Refresh token for a patient' })
  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.patientsService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'Create a new patient' })
  @Post()
  create(@Body() createPatientDto: CreateClientDto) {
    return this.patientsService.create(createPatientDto);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all patients for admin' })
  @Get('/clients')
  findAll() {
    return this.patientsService.findAll();
  }

  // @UseGuards(UserGuard)
  // @ApiOperation({ summary: 'Get all patients for patients' })
  // @Get('/clients')
  // findAllforPatients() {
  //   return this.patientsService.findAll();
  // }
  // @UseGuards()
  // @ApiOperation({ summary: 'Get all patients for doctors' })
  // @Get('/doctor')
  // findAllforDoctor() {
  //   return this.patientsService.findAll();
  // }

  @ApiOperation({ summary: 'Get a patient by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a patient' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdateClientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @ApiOperation({ summary: 'Delete a patient' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
