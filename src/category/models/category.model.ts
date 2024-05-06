import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { CarModel } from "../../car_model/models/car_model.model";

interface CategoryCreationAttr{
    name:string
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  // @BelongsTo(() => CarModel)
  // car_model: CarModel;
}
