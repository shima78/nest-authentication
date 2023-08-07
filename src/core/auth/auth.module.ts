import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserModel, UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './repository/user.repository';
import { Model } from 'mongoose';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRE'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: UserSchema.name, schema: UserModel }]),
  ],
  providers: [
    {
      provide: UserRepository,
      useFactory: (model: Model<UserDocument>) => new UserRepository(model),
      inject: [getModelToken(UserSchema.name)],
    },
    {
      provide: 'AuthService',
      useFactory: (repo: UserRepository, jwtService: JwtService) =>
        new AuthService(repo, jwtService),
      inject: [UserRepository, JwtService],
    },
    {
      provide: 'JWTStrategy',
      useFactory: (repo: UserRepository) => new JWTStrategy(repo),
      inject: [UserRepository],
    },
  ],
  exports: ['JWTStrategy', PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
