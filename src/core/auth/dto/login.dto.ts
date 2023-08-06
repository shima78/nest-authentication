import { User } from '../models/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    example: 'shima@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email' })
  readonly email: string;

  @ApiProperty({
    description: 'Password',
    example: 'Ss123456@',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  readonly password: string;
  static fromViewModel(dto: LoginDto): { email: string; password: string } {
    const { email, password } = dto;
    return { email, password };
  }
}
