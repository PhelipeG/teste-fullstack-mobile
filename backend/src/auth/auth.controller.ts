import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInDTO,
  SignUpDTO,
  SignInSchema,
  SignUpSchema,
} from './dto/auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Registrar novo usuário' })
  @HttpCode(201)
  @Post('register')
  register(@Body(new ZodValidationPipe(SignUpSchema)) body: SignUpDTO) {
    return this.authService.signup(body);
  }
  @ApiOperation({ summary: 'Login do usuário' })
  @HttpCode(200)
  @Post('login')
  login(@Body(new ZodValidationPipe(SignInSchema)) body: SignInDTO) {
    return this.authService.signin(body);
  }
}
