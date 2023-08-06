import { User } from '../models/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'username',
    example: 'Shima',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

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

  static toViewModel(model: User): SignupDto {
    const { name, email, password } = model;
    return { name, email, password };
  }
  static fromViewModel(dto: SignupDto): User {
    const { name, email, password } = dto;
    return new User(name, email, password);
  }
}
