import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'The name of the admin',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The login username of the admin',
    example: 'johndoe',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'The password of the admin',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The confirmation of the password',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    description: 'The email address of the admin',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The phone number of the admin',
    example: '+998901234567',
  })
  @IsNotEmpty()
  @IsPhoneNumber('UZ', {
    message: 'Phone number must be in the format +998xxxxxxxxx',
  })
  phone_number: string;
}
