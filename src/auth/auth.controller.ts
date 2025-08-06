import { Controller, Post, Body, Param, Res, Get, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, ForgotPasswordDto, RecoverPasswordDto, RequestTokenDto } from './dto';
import { AUTH_PROVIDERS, Token, User } from 'generated/prisma';
import { Auth, GetUser, Provider } from './decorators';
import { VALID_PROVIDERS } from './interfaces';
import { ParseTokenPipe } from 'src/common/pipes/parse-token.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1. REGISTRO Y CREACIÓN DE CUENTA
  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('confirm-account/:token')
  confirmAccount(@Param('token', ParseTokenPipe) token: Token['token']) {
    return this.authService.confirmAccount(token);
  }

  @Post('request-token')
  requestToken(@Body() requestTokenDto: RequestTokenDto) {
    return this.authService.requestToken(requestTokenDto);
  }

  // 2. AUTENTICACIÓN Y LOGIN
  @Post('check-email')
  checkEmail(@Body('email') email: User['email']) {
    return this.authService.checkEmail(email);
  }

  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(loginUserDto, response);
  }

  @Post('confirm-access/:token')
  confirmAccess(
    @Param('token', ParseTokenPipe) token: Token['token'],
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.confirmAccess(token, response);
  }

  // 3. AUTENTICACIÓN CON GOOGLE
  @Provider(VALID_PROVIDERS.google)
  @Get('google')
  async googleAuth() {}

  @Provider(VALID_PROVIDERS.google)
  @Get('google/callback')
  async loginGoogle(@Req() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.loginGoogle(req.user, res);
  }

  // 4. RECUPERACIÓN DE CONTRASEÑA
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('recover-password/:token')
  recoverPassword(
    @Param('token', ParseTokenPipe) token: Token['token'],
    @Body() recoverPasswordDto: RecoverPasswordDto
  ) {
    return this.authService.recoverPassword(recoverPasswordDto, token);
  }

  // 5. VALIDACIÓN DE USUARIO AUTENTICADO
  @Get()
  @Auth(AUTH_PROVIDERS.LOCAL)
  validate(@GetUser() user: User) {
    return user;
  }
}