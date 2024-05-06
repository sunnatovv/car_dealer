import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto {
  car_id?: number;
  client_id?: number;
  saled_date?: Date;
  price?: number;
  discount?: number;
  total_price?: number;
  description?: string;
  payment_id?: number;
  order_status_id?: number;
}
