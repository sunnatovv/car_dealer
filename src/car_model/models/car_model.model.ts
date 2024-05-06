import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../category/models/category.model';

interface ICarModelCreationAttr {
  producer_name: string;
  model_name: string;
  category_id: number;
  engine_type: string;
  horsepoower: string;
  fuel_type: string;
}

@Table({ tableName: 'car_model' })
export class CarModel extends Model<CarModel, ICarModelCreationAttr> {
  @ApiProperty({
    description: 'The unique identifier for the Car_model',
    example: 1,
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
  })
  producer_name: string;

  @Column({
    type: DataType.STRING,
  })
  model_name: string;
  // @Column({
  //   type: DataType.INTEGER,
  // })
  // category_id: number;
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number; // Category ID stored in my Database

  @BelongsTo(() => Category)
  category: Category;

  @Column({
    type: DataType.STRING,
  })
  engine_type: string;
  @Column({
    type: DataType.STRING,
  })
  horsepoower: string;
  @Column({
    type: DataType.STRING,
  })
  fuel_type: string;
}
