import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, ForgotPasswordDto, RecoverPasswordDto, RequestTokenDto, CheckEmailUserDto } from './dto';
import { Token, User } from 'generated/prisma';
import { Auth, GetUser, Provider } from './decorators';
import { VALID_PROVIDERS } from './interfaces';
import { ParseOtpPipe } from 'src/common/pipes/parse-otp.pipe';
import { Header } from '@decorators/header.decorator';
import { validate } from 'uuid';
import { JwtUser } from './interfaces';
import { CompleteAccountDto } from './dto/complete-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // 1. REGISTRO Y CREACIÓN DE CUENTA
  @Post('create-account')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('confirm-account')
  confirmAccount(
    @Header('x-token', validate) x_token: Token['id'],
    @Body('otp', ParseOtpPipe) otp: Token['token']
  ) {
    return this.authService.confirmAccount(x_token, otp);
  }

  @Post('complete-account')
  completeAccount(
    @Body() completeAccountDto: CompleteAccountDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.completeAccount(completeAccountDto, response);
  }


  // Validando token
  @Post('validate-token')
  validateToken(
    @Header('x-token', validate) x_token: Token['id'],
    @Body('otp', ParseOtpPipe) otp: Token['token']
  ) {
    return this.authService.validateToken(x_token, otp);
  }

  @Post('check-token')
  checkToken(
    @Header('x-token', validate) x_token: Token['id']) {
    return this.authService.checkToken(x_token);
  }
  
  @Post('request-token')
  requestToken(@Body() requestTokenDto: RequestTokenDto) {
    return this.authService.requestToken(requestTokenDto);
  }

  // 2. AUTENTICACIÓN Y LOGIN
  // hacer dto
  @Post('check-email')
  checkEmail(@Body() checkEmailUserDto: CheckEmailUserDto) {
    return this.authService.checkEmail(checkEmailUserDto);
  }

  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(loginUserDto, response);
  }

  @Post('confirm-access')
  confirmAccess(
    @Body('otp', ParseOtpPipe) otp: Token['token'],
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.confirmAccess(otp, response);
  }

  // 3. AUTENTICACIÓN CON GOOGLE
  @Provider(VALID_PROVIDERS.google)
  @Get('google')
  async googleAuth() { }

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

  @Post('recover-password')
  recoverPassword(
    @Body() recoverPasswordDto: RecoverPasswordDto,
    @Header('x-token', validate) token: Token['token'],
  ) {
    return this.authService.recoverPassword(recoverPasswordDto, token);
  }

  // 5. VALIDACIÓN DE USUARIO AUTENTICADO
  @Get()
  @Auth()
  // @Auth(AUTH_PROVIDERS.LOCAL)
  validate(@GetUser() user: JwtUser) {
    return user;
  }
}