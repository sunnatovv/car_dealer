import { IsEmail, IsString } from 'class-validator';

/**
 * Data Transfer Object (DTO) for patient login.
 */
export class LoginClientDto {
  /**
   * The email of the patient.
   *
   * @example john@example.com
   */
  @IsString()
  @IsEmail()
  email: string;

  /**
   * The password of the patient.
   *
   * @example password123
   */
  @IsString()
  password: string;

  /**
   * The confirmation of the password.
   *
   * @example password123
   */
  @IsString()
  confirm_password: string;
}
