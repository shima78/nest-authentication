import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(user: User): Promise<{ token: string }> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.setPassword(hashedPassword);
      const userID = await this.repository.create(user);
      const token = this.jwtService.sign({ id: userID });
      return { token };
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        // Duplicate email error
        throw new ConflictException('Email address is already in use');
      }
      throw new InternalServerErrorException('User registration failed');
    }
  }
}
