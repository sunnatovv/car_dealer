import { Injectable } from '@nestjs/common';
import { CreateOrderStatusIdDto } from './dto/create-order_status_id.dto';
import { UpdateOrderStatusIdDto } from './dto/update-order_status_id.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderStatus } from './models/order_status.model';

@Injectable()
export class OrderStatusIdService {
  constructor(
    @InjectModel(OrderStatus) private orderStatusRepo: typeof OrderStatus,
  ) {}
  create(createOrderStatusIdDto: CreateOrderStatusIdDto) {
    return this.orderStatusRepo.create(createOrderStatusIdDto);
  }

  findAll() {
    return this.orderStatusRepo.findAll();
  }

  findOne(id: number) {
    return this.orderStatusRepo.findByPk(id);
  }

  update(id: number, updateOrderStatusIdDto: UpdateOrderStatusIdDto) {
    return this.orderStatusRepo.update(updateOrderStatusIdDto, {
      where: { id: id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.orderStatusRepo.destroy({ where: { id } });
  }
}
