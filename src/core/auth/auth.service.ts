import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { EntityNotFoundException } from '../../shared/exceptions';
import { Token } from './models/token.model';
@Injectable()
export class AuthService {
  constructor(
    private repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(user: User): Promise<Token> {
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
  async login(email: string, password: string): Promise<Token> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new EntityNotFoundException();
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid email or password');
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
