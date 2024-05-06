import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderStatusIdService } from './order_status.service';
import { CreateOrderStatusIdDto } from './dto/create-order_status_id.dto';
import { UpdateOrderStatusIdDto } from './dto/update-order_status_id.dto';

@Controller('order-status-id')
export class OrderStatusIdController {
  constructor(private readonly orderStatusIdService: OrderStatusIdService) {}

  @Post()
  create(@Body() createOrderStatusIdDto: CreateOrderStatusIdDto) {
    return this.orderStatusIdService.create(createOrderStatusIdDto);
  }

  @Get()
  findAll() {
    return this.orderStatusIdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderStatusIdService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderStatusIdDto: UpdateOrderStatusIdDto,
  ) {
    return this.orderStatusIdService.update(+id, updateOrderStatusIdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderStatusIdService.remove(+id);
  }
}
