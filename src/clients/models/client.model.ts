import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface IClientCreationAttr {
  first_name: string;
  last_name: string;
  address: string;
  birth_date: Date;
  phone: string;
  email: string;
  hashed_password: string;
  is_active: boolean;
}

@Table({ tableName: 'clients' })
export class Client extends Model<Client, IClientCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the client.',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'John',
    description: 'The first_name of the client.',
  })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last_name of the client.',
  })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({
    example: '123 Main St, City',
    description: 'The address of the client.',
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the client.',
  })
  @Column({
    type: DataType.DATE,
  })
  birth_date: Date;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the patient.',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the patient.',
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({
    example: 'hashed_password',
    description: 'The hashed password of the patient.',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'hashed_refresh_token',
    description: 'The hashed refresh token of the client.',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    example: 'activation_link',
    description: 'The activation link for the client.',
  })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @ApiProperty({
    example: false,
    description: 'Indicates if the client is active.',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
}
