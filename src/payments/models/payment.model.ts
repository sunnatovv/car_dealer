import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IPaymentCreationAttr {
  payment_date: string;
  amount: string;
  method: string;
  description: string;
}
@Table({ tableName: 'payments' })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  payment_date: string;
  @Column({ type: DataType.STRING })
  amount: string;
  @Column({ type: DataType.STRING })
  method: string;
  @Column({ type: DataType.STRING })
  description: string;
}
