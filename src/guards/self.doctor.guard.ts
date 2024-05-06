import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfDoctorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log("req",req);
    

    // Check if req.doctor exists
    if (!req.doctor) {
      throw new ForbiddenException({
        message: 'Doctor information not found',
      });
    }

    console.log('req.doctor ', req.doctor);
    console.log('req.query.id  ', req.params.id); // Assuming ID is passed as a query parameter

    // Compare doctor ID with the ID passed in the query
    if (String(req.doctor.id) !== req.params.id) {
      throw new ForbiddenException({
        message: 'Access denied. You are not authorized to access this doctor',
      });
    }

    // Check if the doctor is active
    if (req.doctor.is_active === false) {
      throw new ForbiddenException({
        message: 'Access denied. Doctor is not active',
      });
    }

    // Return true if all conditions pass
    return true;
  }
}
