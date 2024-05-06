import { PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto {
  color?: string;
  price?: number;
  quantity?: number;
  year?: Date;
  car_model_id?: number;
}
