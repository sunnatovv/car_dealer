import { Module } from '@nestjs/common';
import { OrderStatusIdService } from './order_status.service';
import { OrderStatusIdController } from './order_status.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderStatus } from './models/order_status.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderStatus])],
  controllers: [OrderStatusIdController],
  providers: [OrderStatusIdService],
})
export class OrderStatusIdModule {}
