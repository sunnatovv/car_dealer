import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface AdminCreationAttr {
  name: string;
  login: string;
  hashedPassword: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  is_creator: boolean;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminCreationAttr> {
  @ApiProperty({
    description: 'The unique identifier for the admin',
    example: 1,
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the admin',
    example: 'John Doe',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    description: 'The login username of the admin',
    example: 'johndoe',
  })
  @Column({
    type: DataType.STRING,
  })
  login: string;

  @ApiProperty({
    description: 'The hashed password of the admin',
    example: 'hashedpassword123',
  })
  @Column({
    type: DataType.STRING,
  })
  hashedPassword: string;

  @ApiProperty({
    description: 'The email address of the admin',
    example: 'john@example.com',
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of the admin',
    example: '1234567890',
  })
  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @ApiProperty({
    description: 'Indicates whether the admin is active or not',
    example: true,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    description: 'Indicates whether the admin is a creator or not',
    example: true,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({
    description: 'The hashed refresh token of the admin',
    example: 'hashedrefreshtoken123',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  hashedRefreshToken: string;

  @ApiProperty({
    description: 'The activation link of the admin',
    example: 'activationlink123',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  activationLink: string;
}
