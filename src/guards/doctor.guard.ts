import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class DoctorGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(`Invalid authorization`);
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(`Invalid authorization`);
    }

    async function verify(token: string, jwtService: JwtService) {
      let doctor: any;
      try {
        doctor = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      if (!doctor) {
        throw new UnauthorizedException('Doctor not verified');
      }
      if (!doctor.is_active) {
        throw new BadRequestException('Doctor is not active');
      }
      req.doctor = doctor;
      return true;
    }
    return verify(token, this.jwtService);
  }
}
