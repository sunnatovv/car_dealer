import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IEmployeeCreationAttr {
  first_name: string;
  last_name: string;
  position: string;
  salary: number;
}
@Table({ tableName: 'employee' })
export class Employee extends Model<Employee, IEmployeeCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  first_name: string;
  @Column({ type: DataType.STRING })
  last_name: string;
  @Column({ type: DataType.STRING })
  position: string;
  @Column({ type: DataType.INTEGER })
  salary: number;
}
