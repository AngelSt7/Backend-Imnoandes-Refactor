import { Controller, Post, Body, Param, Res, Get, Req, UseGuards } from '@nestjs/common';
import { Documentation } from '@decorators/doc/base/documentation.decorator';
import { RequestTokenDto } from './dto/requests/request-token';
import { CreateUserDto, LoginUserDto, RecoverPasswordDto, ForgotPasswordDto } from './dto/requests';
import { AuthService } from './auth.service';
import { ParseTokenPipe } from 'src/common/pipes/parse-token.pipe';
import { Response } from 'express';
import { ResponseLoginDto, ResponseConfirmAccountDto, ResponseRequestTokenDto, ResponseRecoverPasswordDto, ResponseForgotPasswordDto, ResponseCreateUserDto } from './dto/response';
import { ResponseDto } from 'src/common/dto/base-response.dto';
import { AUTH_CONFIRM_ACCOUNT_RESPONSE, AUTH_FORGOT_PASSWORD_RESPONSE, AUTH_LOGIN_RESPONSE, AUTH_RECOVER_PASSWORD_RESPONSE, AUTH_REGISTER_RESPONSE, AUTH_REQUEST_TOKEN_RESPONSE } from './utils/auth-doc.responses';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @Documentation({
    type: ResponseDto(ResponseCreateUserDto, 'User created, check your email to confirm your account'),
    responses: AUTH_REGISTER_RESPONSE
  })
  register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }



  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth() {
  }

  @UseGuards(AuthGuard('google'))
  @Get('/google/callback')
  async googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.handleGoogleLogin(req.user, res);
  }






  @Post('login')
  @Documentation({
    type: ResponseDto(ResponseLoginDto, 'Login successful, welcome ${user.name}'),
    responses: AUTH_LOGIN_RESPONSE
  })
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(loginUserDto, response);
  }

  @Post('confirm-account/:token')
  @Documentation({
    type: ResponseConfirmAccountDto,
    responses: AUTH_CONFIRM_ACCOUNT_RESPONSE
  })
  confirmAccount(@Param('token', ParseTokenPipe) token: string) {
    return this.authService.confirmAccount(token);
  }

  @Post('request-token')
  @Documentation({
    type: ResponseRequestTokenDto,
    responses: AUTH_REQUEST_TOKEN_RESPONSE
  })
  requestToken(@Body() requestTokenDto: RequestTokenDto) {
    return this.authService.requestToken(requestTokenDto);
  }

  @Post('forgot-password')
  @Documentation({
    type: ResponseForgotPasswordDto,
    responses: AUTH_FORGOT_PASSWORD_RESPONSE
  })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('recover-password/:token')
  @Documentation({
    type: ResponseRecoverPasswordDto,
    responses: AUTH_RECOVER_PASSWORD_RESPONSE
  })
  recoverPassword(
    @Param('token', ParseTokenPipe) token: string,
    @Body() recoverPasswordDto: RecoverPasswordDto
  ) {
    return this.authService.recoverPassword(recoverPasswordDto, token);
  }

}
