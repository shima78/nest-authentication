import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
@ApiTags('Identity')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService,
  ) {}
  @Post('/signup')
  signup(@Body() signupDto: SignupDto): Promise<{ token: string }> {
    return this.authService.signup(SignupDto.fromViewModel(signupDto));
  }
}
