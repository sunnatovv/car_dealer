import { PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto {
  name?: string;
  price?: number;
  description?: string;
}
