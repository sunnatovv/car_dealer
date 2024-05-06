import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a new client.
 */
export class CreateClientDto {
  /**
   * The first name of the client.
   *
   * @example John
   */
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;

  /**
   * The address of the client.
   *
   * @example 123 Main Street, City, Country
   */
  @IsNotEmpty()
  @IsString()
  address: string;

  /**
   * The date of birth of the client.
   *
   * @example 1990-01-01
   */
  @IsDate()
  birth_date: Date;

  /**
   * The phone number of the client.
   *
   * @example +998901234567
   */
  @IsString()
  @IsPhoneNumber('UZ')
  phone: string;

  /**
   * The email of the client.
   *
   * @example john@example.com
   */
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  /**
   * The password of the client.
   *
   * @example password123
   */
  @IsString()
  @IsNotEmpty()
  hashed_password: string;
}
