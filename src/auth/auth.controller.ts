import { Controller, Post, Body, Param, Res, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ParseTokenPipe } from 'src/common/pipes/parse-token.pipe';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, LoginUserDto, ForgotPasswordDto, RecoverPasswordDto, RequestTokenDto } from './dto';
import { AUTH_PROVIDERS, Token, User } from 'generated/prisma';
import { Auth, GetUser } from './decorators';
import { Provider } from './decorators/provider.decorator';
import { VALID_PROVIDERS } from './interfaces';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Provider(VALID_PROVIDERS.google)
  @Get('google')
  async googleAuth() {}

  @UseGuards(AuthGuard('google'))
  @Get('/google/callback')
  async loginGoogle(@Req() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.loginGoogle(req.user, res);
  }

  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(loginUserDto, response);
  }

  @Post('confirm-account/:token')
  confirmAccount(@Param('token', ParseTokenPipe) token: Token['token']) {
    return this.authService.confirmAccount(token);
  }

  @Post('request-token')
  requestToken(@Body() requestTokenDto: RequestTokenDto) {
    return this.authService.requestToken(requestTokenDto);
  }

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

  @Get()
  @Auth(AUTH_PROVIDERS.LOCAL)
  validate(
    @GetUser() user: User
  ) {
    return user
  }

}
