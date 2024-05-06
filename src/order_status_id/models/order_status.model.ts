import { Column, DataType, Model, Table } from "sequelize-typescript"

interface IOrder_statusCreationAttr{
    name:string
    description:string
}
@Table({tableName:"order_status"})
export class OrderStatus extends Model<OrderStatus, IOrder_statusCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  description: string;
}
