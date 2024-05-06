import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({
    description: 'The login username of the admin',
    example: 'johndoe',
    required: false,
  })
  @IsOptional()
  @IsString()
  login?: string;

  @ApiProperty({
    description: 'The Telegram link of the admin',
    example: 'https://t.me/johndoe',
    required: false,
  })
  @IsOptional()
  @IsString()
  tgLink?: string;

  @ApiProperty({
    description: 'The URL of the admin photo',
    example: 'https://example.com/photo.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  adminPhoto?: string;

  @ApiProperty({
    description: 'The password of the admin',
    example: 'password123',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'The confirmation of the password',
    example: 'password123',
    required: false,
  })
  @IsOptional()
  @IsString()
  confirmPassword?: string;
}
