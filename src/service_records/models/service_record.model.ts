import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Car } from '../../cars/models/car.model';
import { Service } from '../../services/models/service.model';
import { Employee } from '../../employees/models/employee.model';

interface IServiceRecordCreationAttr {
  car_id: number;
  service_id: number;
  employee_id: number;
  service_date: Date;
}
@Table({ tableName: 'service_record' })
export class ServiceRecord extends Model<
  ServiceRecord,
  IServiceRecordCreationAttr
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Car)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  car_id: number;
  @BelongsTo(() => Car)
  cars: Car;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  service_id: number;
  @BelongsTo(() => Service)
  services: Service;

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  employee_id: number;
  @BelongsTo(() => Employee)
  employees: Employee;

  @Column({ type: DataType.DATE })
  service_date: Date;
}
