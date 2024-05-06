import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    console.log('req', req.user);

    console.log('req.admin ', req.user);
    console.log('req.params.id  ', req.params.id);
    console.log('req.admin.id  ', req.params.id);

    if (String(req.user.id) != req.params.id) {
      throw new ForbiddenException({
        message: 'Ruxsat etilmagan patient',
      });
    }

    if (req.user.is_active === false || req.user.is_creator == true) {
      throw new ForbiddenException({
        message: 'Ruxsat etilmagan patient',
      });
    }
    return true;
  }
}
