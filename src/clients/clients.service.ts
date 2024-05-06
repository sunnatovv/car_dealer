import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Client } from './models/client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { LoginClientDto } from './dto/login-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsMailService } from '../mail/client.mail.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client) private patientRepo: typeof Client,
    private readonly jwtService: JwtService,
    private readonly mailService: ClientsMailService,
  ) {}

  async getTokens(patient: Client) {
    const payload = {
      id: patient.id,
    };
    const [accesToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.PATIENT_ACCESS_TOKEN,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.PATIENT_REFRESH_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accesToken,
      refresh_token: refreshToken,
    };
  }

  async registration(createPatientDto: CreateClientDto, res: Response) {
    const user = await this.patientRepo.findOne({
      where: { email: createPatientDto.email },
    });
    if (user) {
      throw new BadRequestException('Bunday foydalanuvchi mavjud');
    }

    console.log('hello');
    console.log(createPatientDto.hashed_password, createPatientDto.first_name);

    const hashed_password = await bcrypt.hash(
      createPatientDto.hashed_password,
      10,
    );
    const newPatient = await this.patientRepo.create({
      ...createPatientDto,
      hashed_password,
    });

    const tokens = await this.getTokens(newPatient);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    console.log(hashed_refresh_token);

    const activation_link = v4();

    const updatedPatient = await this.patientRepo.update(
      { hashed_refresh_token, activation_link },
      { where: { id: newPatient.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      this.mailService.sendMail(updatedPatient[1][0]);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Xatni yuborishda xatolik');
    }

    const response = {
      message: 'Patient registered',
      user: updatedPatient[1][0],
      tokens,
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('activation link not found');
    }

    const updatePatient = await this.patientRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );

    if (!updatePatient[1][0]) {
      throw new BadRequestException('user already activated');
    }
    const response = {
      message: 'User activated successfully',
      user: updatePatient[1][0].is_active,
    };
    return response;
  }

  async login(loginPatientDto: LoginClientDto, res: Response) {
    const { email, password } = loginPatientDto;
    const user = await this.patientRepo.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Patient not found');
    }

    if (!user.is_active) {
      throw new BadRequestException('Patient not activated');
    }
    const isMatchPass = await bcrypt.compare(password, user.hashed_password);

    if (!isMatchPass) {
      throw new BadRequestException('Password do not match');
    }

    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.patientRepo.update(
      { hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.PATIENT_REFRESH_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('user not verified');
    }

    const updatedUser = await this.patientRepo.update(
      {
        hashed_refresh_token: null,
      },
      { where: { id: userData.id }, returning: true },
    );
    res.clearCookie('refresh_token');

    const response = {
      message: 'Patient logged out succesfully',
      user_refresh_token: updatedUser[1][0].hashed_refresh_token,
    };
    return response;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);

    if (userId !== decodedToken['id']) {
      throw new BadRequestException('ruxsat etilmagan id');
    }
    const user = await this.patientRepo.findOne({ where: { id: userId } });

    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('user not found');
    }
    const tokenIsMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!tokenIsMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.patientRepo.update(
      { hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User refreshed',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  create(createPatientDto: CreateClientDto) {
    return this.patientRepo.create(createPatientDto);
  }

  findAll() {
    return this.patientRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.patientRepo.findOne({ where: { id } });
  }

  async update(id: number, updatePatientDto: UpdateClientDto) {
    const updatePatient = await this.patientRepo.update(updatePatientDto, {
      where: { id },
      returning: true,
    });
    return updatePatient[1][0];
  }

  remove(id: number) {
    return this.patientRepo.destroy({ where: { id } });
  }
}
