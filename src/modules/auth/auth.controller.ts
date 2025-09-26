import { Auth, GetUser, Provider } from '@/modules/auth/decorators';
import { AuthService } from './auth.service';
import { CACHE_KEYS } from '@/cache/cache-keys';
import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, ForgotPasswordDto, RecoverPasswordDto, RequestTokenDto, CheckEmailUserDto, CompleteAccountDto } from './dto';
import { Header } from '@/common/decorators';
import { ParseOtpPipe } from '@/common/pipes';
import { RedisService } from '@/common/services';
import { Response } from 'express';
import { Token } from 'generated/prisma';
import { VALID_PROVIDERS } from '@/constants';
import { validate } from 'uuid';
import { JwtUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService
  ) { }

  // 1. REGISTRO Y CREACIÓN DE CUENTA
  @Post('create-account')
  create(@Body() dto: CreateUserDto) {
    return this.authService.create(dto);
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
    @Body() dto: CompleteAccountDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.completeAccount(dto, response);
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
  requestToken(@Body() dto: RequestTokenDto) {
    return this.authService.requestToken(dto);
  }

  // 2. AUTENTICACIÓN Y LOGIN
  // hacer dto
  @Post('check-email')
  checkEmail(
    @Body() dto: CheckEmailUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.checkEmail(dto, response);
  }

  @Post('login')
  login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(dto, response);
  }

  @Post('confirm-access')
  confirmAccess(
    @Body('otp', ParseOtpPipe) otp: Token['token'],
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.confirmAccess(otp, response);
  }

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
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('recover-password')
  recoverPassword(
    @Body() dto: RecoverPasswordDto,
    @Header('x-token', validate) token: Token['token'],
  ) {
    return this.authService.recoverPassword(dto, token);
  }

  // 5. VALIDACIÓN DE USUARIO AUTENTICADO
  @Auth()
  @Get()
  async validate(
    @GetUser() user: JwtUser
  ) {
    const cacheKey = `${CACHE_KEYS.USER}/${user.id}`
    const cached = await this.redisService.get(cacheKey);
    if (cached) return JSON.parse(cached);
    await this.redisService.set(cacheKey, JSON.stringify(user), 'EX', 3600);
    return user;
  }
}