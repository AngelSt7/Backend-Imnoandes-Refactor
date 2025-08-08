import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto, LoginUserDto, RequestTokenDto, ForgotPasswordDto, RecoverPasswordDto, CheckEmailUserDto } from './dto';
import { MailService } from 'src/common/services/mail.service';
import { AUTH_PROVIDERS, Token, User } from 'generated/prisma';
import { BcryptService, CookieService, JwtService, TokenService, UserService, MessageService, RedirectService } from './services';
import { MODE } from './interfaces';
import { CompleteAccountDto } from './dto/complete-account.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
    private readonly cookieService: CookieService,
    private readonly redirectService: RedirectService,
    private readonly messageService: MessageService
  ) { }

  // 1. REGISTRO Y CREACIÓN DE CUENTA
  async create(createAuthDto: CreateUserDto) {
    const user = await this.userService.create(createAuthDto);
    const token = await this.tokenService.upsert(user.id);
    this.mailService.sendAccountConfirmationEmail(user.email, token, user.name);
    return {
      message: this.messageService.created()
    };
  }

  async confirmAccount(x_token: Token['id'], otp: Token['token']) {
    const tokenDB = await this.tokenService.valid(otp);
    if (x_token !== tokenDB.id) throw new BadRequestException('Token not valid');
    await Promise.all([
      this.userService.confirm(tokenDB.userId),
      this.tokenService.delete(tokenDB.userId)
    ]);
    return {
      message: this.messageService.accountConfirmed()
    };
  }

  async validateToken(x_token: Token['id'], otp: Token['token']) {
    const tokenDB = await this.tokenService.valid(otp);
    if (x_token !== tokenDB.id) throw new BadRequestException('Token not valid');
    return {
      message: this.messageService.tokenValidated(),
      id: tokenDB.id
    }
  }

  async checkToken(x_token: Token['id']) {
    await this.tokenService.valid(x_token);
    return { ok: true };
  }

  async requestToken(requestTokenDto: RequestTokenDto) {
    const user = await this.userService.find(requestTokenDto.email);
    if (user.confirmed) throw new BadRequestException('This resource is only for unconfirmed users');
    const token = await this.tokenService.upsert(user.id);
    this.mailService.sendAccountConfirmationEmail(requestTokenDto.email, token, user.name);
    return {
      message: this.messageService.request()
    };
  }

  // 2. AUTENTICACIÓN Y LOGIN
  async checkEmail(checkEmailUserDto: CheckEmailUserDto) {
    const user = await this.userService.exist(checkEmailUserDto.email);
    if (!user) throw new BadRequestException('User not found, create an account');
    if (user && !user.confirmed) throw new BadRequestException('User not confirmed, confirm your account');

    if (user && user.authProvider === AUTH_PROVIDERS.GOOGLE) {
      const { token } = await this.tokenService.upsert(user.id);
      this.mailService.sendAccessConfirmationEmail(user.email, token, user.name);
    }

    return {
      provider: user.authProvider,
      requiredPassword: user.authProvider === AUTH_PROVIDERS.LOCAL ? true : false,
      requiredOtp: user.authProvider === AUTH_PROVIDERS.LOCAL ? false : true,
      message: this.messageService.checkEmail(user.authProvider)
    };
  }

  async login(loginUserDto: LoginUserDto, response: Response) {
    const user = await this.userService.find(loginUserDto.email);
    if (!user.confirmed) throw new BadRequestException('User not confirmed, confirm your account');

    const match = await this.bcryptService.compare(loginUserDto.password, user.password!);
    if (!match) throw new BadRequestException('Password incorrect');

    const JWT = this.jwtService.getJwt({ id: user.id });
    const message = this.messageService.welcome(user.name);
    this.cookieService.setAuthCookie(MODE.SESSION, JWT, response);

    return { message };
  }

  async confirmAccess(token: Token['token'], response: Response) {
    const { userId } = await this.tokenService.valid(token);
    const user = await this.userService.find(userId);
    const JWT = this.jwtService.getJwt({ id: user.id });
    const mode = this.redirectService.mode(user);
    this.cookieService.setAuthCookie(mode, JWT, response);
    this.tokenService.delete(userId);
    const redirect = this.redirectService.url(mode, JWT);
    return {
      redirect,
      message: this.messageService.welcome(user.name)
    };
  }

  // 3. AUTENTICACIÓN CON GOOGLE
  loginGoogle(user: User, response: Response) {
    if ('error' in user) {
      this.cookieService.setErrorCookie(response);
      return response.redirect(this.redirectService.url(MODE.ERROR));
    }
    const JWT = this.jwtService.getJwtTemp({ id: user.id });
    const mode = this.redirectService.mode(user);
    this.cookieService.setAuthCookie(MODE.TEMP, JWT, response);
    const redirectUrl = this.redirectService.url(mode, JWT);
    return response.redirect(redirectUrl);
  }

  // 4. RECUPERACIÓN DE CONTRASEÑA
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.find(forgotPasswordDto.email);
    if (user.authProvider !== AUTH_PROVIDERS.LOCAL) throw new BadRequestException('You must use a local account to recover your password');
    if (!user.confirmed) throw new BadRequestException('This resource is only for confirmed users');
    const token = await this.tokenService.upsert(user.id);
    this.mailService.sendPasswordResetEmail(forgotPasswordDto.email, token, user.name);
    return {
      message: this.messageService.forgot()
    };
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto, x_token: Token['token']) {
    const { userId } = await this.tokenService.valid(x_token);
    const user = await this.userService.find(userId);
    if (!user.confirmed) throw new BadRequestException('This resource is only for confirmed users');
    const passwordHash = await this.bcryptService.hash(recoverPasswordDto.password);

    await Promise.all([
      this.userService.recover(user.id, passwordHash),
      this.tokenService.delete(user.id)
    ]);

    return {
      message: this.messageService.recover()
    };
  }

  async completeAccount(completeAccountDto: CompleteAccountDto, response) {
    const user = await this.userService.find(completeAccountDto.id);
    await this.userService.completeAccount(completeAccountDto, user.id);
    const token = this.jwtService.getJwt({ id: user.id });
    this.cookieService.setAuthCookie(MODE.SESSION, token, response);
    this.cookieService.clearAuthCookie(MODE.TEMP, response);
    return {
      message: this.messageService.accountCompleted()
    }
  }
}