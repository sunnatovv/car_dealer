import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CarModel } from '../../car_model/models/car_model.model';
import { ServiceRecord } from '../../service_records/models/service_record.model';

interface ICarCreationAttr {
  color: string;
  price: number;
  quantity: number;
  year: Date;
  car_model_id: number;
}

@Table({ tableName: 'Car' })
export class Car extends Model<Car, ICarCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => CarModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  car_model_id: number;

  @BelongsTo(() => CarModel)
  car_model: CarModel;

  @Column({ type: DataType.STRING })
  color: string;
  @Column({ type: DataType.INTEGER })
  price: number;
  @Column({ type: DataType.INTEGER })
  quantity: number;
  @Column({ type: DataType.DATEONLY })
  year: Date;
}
