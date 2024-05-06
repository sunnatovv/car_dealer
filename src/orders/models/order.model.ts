import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Car } from '../../cars/models/car.model';
import { Payment } from '../../payments/models/payment.model';
import { OrderStatus } from '../../order_status_id/models/order_status.model';

interface IOrderCreationAttr {
  car_id: number;
  client_id: number;
  saled_date: Date;
  price: number;
  discount: number;
  total_price: number;
  description: string;
  payment_id: number;
  order_status_id: number;
}
@Table({ tableName: 'order' })
export class Order extends Model<Order, IOrderCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => Car)
  @Column({ type: DataType.INTEGER })
  car_id: number;
  @BelongsTo(() => Car)
  car: Car;

  //   @ForeignKey(() => Clients)
  @Column({ type: DataType.INTEGER })
  client_id: number;
  //   @BelongsTo(() => Car)
  //   clients: Car;

  @Column({ type: DataType.DATEONLY })
  saled_date: Date;
  @Column({ type: DataType.INTEGER })
  price: number;
  @Column({ type: DataType.INTEGER })
  discount: number;
  @Column({ type: DataType.INTEGER })
  total_price: number;
  @Column({ type: DataType.STRING })
  description: string;

  @ForeignKey(() => Payment)
  @Column({ type: DataType.INTEGER })
  payment_id: number;
  @BelongsTo(() => Payment)
  payments: Payment;

  @ForeignKey(() => OrderStatus)
  @Column({ type: DataType.INTEGER })
  order_status_id: number;
  @BelongsTo(() => OrderStatus)
  order_status: OrderStatus;
}
