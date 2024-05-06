import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IServiceCreationAttr {
  name: string;
  price: number;
  description: string;
}
@Table({ tableName: 'service' })
export class Service extends Model<Service, IServiceCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;
  @Column({ type: DataType.INTEGER })
  price: number;
  @Column({ type: DataType.STRING })
  description: string;
}
