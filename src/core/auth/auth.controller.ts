import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { Token } from './models/token.model';
@ApiTags('Identity')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService,
  ) {}
  @Post('/signup')
  @ApiOperation({
    summary: 'SignUp',
  })
  @ApiOkResponse({ description: 'User registered', type: TokenDto })
  signup(@Body() signupDto: SignupDto): Promise<Token> {
    return this.authService.signup(SignupDto.fromViewModel(signupDto));
  }
  @Post('/login')
  @ApiOperation({
    summary: 'Login',
  })
  @ApiOkResponse({ description: 'User LoggedIn', type: TokenDto })
  login(@Body() loginDto: LoginDto): Promise<Token> {
    const { email, password } = LoginDto.fromViewModel(loginDto);
    return this.authService.login(email, password);
  }
}
