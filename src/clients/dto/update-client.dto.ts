import { IsDate, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateClientDto {
  /**
   * The first name of the client.
   *
   * @example John
   */
  @IsString()
  first_name?: string;
  @IsString()
  last_name?: string;

  /**
   * The address of the client.
   *
   * @example 123 Main Street, City, Country
   */
  @IsString()
  address?: string;

  /**
   * The date of birth of the client.
   *
   * @example 1990-01-01
   */
  @IsDate()
  birth_date?: Date;

  /**
   * The phone number of the client.
   *
   * @example +998901234567
   */
  @IsString()
  @IsPhoneNumber('UZ')
  phone?: string;

  /**
   * The email of the client.
   *
   * @example john@example.com
   */
  @IsString()
  @IsEmail()
  email?: string;

  /**
   * The password of the client.
   *
   * @example password123
   */
  @IsString()
  password: string;
}
