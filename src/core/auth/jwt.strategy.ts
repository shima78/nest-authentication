import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from './repository/user.repository';
import * as process from 'process';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private repository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload) {
    const { id } = payload;
    const user = await this.repository.findById(id);
    if (!user) throw new UnauthorizedException('Login to access this endpoint');
    return user;
  }
}
