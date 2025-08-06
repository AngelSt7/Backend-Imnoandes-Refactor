import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto, LoginUserDto, RequestTokenDto, ForgotPasswordDto, RecoverPasswordDto } from './dto';
import { MailService } from 'src/common/services/mail.service';
import { AUTH_PROVIDERS, Token, User } from 'generated/prisma';
import { BcryptService, CookieService, JwtService, TokenService, UserService, MessageService, RedirectService } from './services';
import { MODE } from './interfaces';

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
  ) {}

  // 1. REGISTRO Y CREACIÓN DE CUENTA
  async create(createAuthDto: CreateUserDto) {
    const user = await this.userService.create(createAuthDto);
    const token = await this.tokenService.upsert(user.id);
    await this.mailService.sendAccountConfirmationEmail(user.email, token, user.name);
    return {
      message: this.messageService.created()
    };
  }

  async confirmAccount(token: Token['token']) {
    const userId = await this.tokenService.valid(token);
    await Promise.all([
      this.userService.confirm(userId), 
      this.tokenService.delete(userId)
    ]);
    return {
      message: this.messageService.accountConfirmed()
    };
  }

  async requestToken(requestTokenDto: RequestTokenDto) {
    const user = await this.userService.find(requestTokenDto.email);
    const token = await this.tokenService.upsert(user.id);
    await this.mailService.sendAccountConfirmationEmail(requestTokenDto.email, token, user.name);
    return {
      message: this.messageService.request()
    };
  }

  // 2. AUTENTICACIÓN Y LOGIN
  async checkEmail(email: User['email']) {
    const user = await this.userService.exist(email);
    if (!user) throw new BadRequestException('User not found, create an account');
    if (user && !user.confirmed) throw new BadRequestException('User not confirmed, confirm your account');
    
    if (user && user.authProvider === AUTH_PROVIDERS.GOOGLE) {
      const token = await this.tokenService.upsert(user.id);
      await this.mailService.sendAccessConfirmationEmail(user.email, token, user.name);
    }
    
    return { 
      ok: true,
      provider: user.authProvider,
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
    const userId = await this.tokenService.valid(token);
    const user = await this.userService.find(userId);
    const JWT = this.jwtService.getJwt({ id: user.id });
    const mode = this.redirectService.mode(user);
    this.cookieService.setAuthCookie(mode, JWT, response);
    const redirectUrl = this.redirectService.url(mode, JWT);
    return redirectUrl;
  }

  // 3. AUTENTICACIÓN CON GOOGLE
  loginGoogle(user: User, response: Response) {
    const JWT = this.jwtService.getJwt({ id: user.id });
    const mode = this.redirectService.mode(user);
    this.cookieService.setAuthCookie(MODE.TEMP, JWT, response);
    const redirectUrl = this.redirectService.url(mode, JWT);
    return response.redirect(redirectUrl);
  }

  // 4. RECUPERACIÓN DE CONTRASEÑA
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.find(forgotPasswordDto.email);
    const token = await this.tokenService.upsert(user.id);
    await this.mailService.sendPasswordResetEmail(forgotPasswordDto.email, token, user.name);
    return {
      message: this.messageService.forgot()
    };
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto, token: Token['token']) {
    await this.tokenService.valid(token);
    const user = await this.userService.find(recoverPasswordDto.email);
    const passwordHash = await this.bcryptService.hash(recoverPasswordDto.password);
    
    await Promise.all([
      this.userService.recover(user.id, passwordHash), 
      this.tokenService.delete(user.id)
    ]);
    
    return {
      message: this.messageService.recover()
    };
  }
}