import { BadRequestException, Injectable } from '@nestjs/common';
import { BcryptService } from './services/bcrypt.service';
import { HandleErrorsService } from 'src/common/services/handle-errors.service';
import { CreateUserDto, LoginUserDto, RequestTokenDto, ForgotPasswordDto, RecoverPasswordDto } from './dto';
import { MailService } from 'src/common/services/mail.service';
import { TokenService } from './services/token.service';
import { JwtService } from './services/jwt.service';
import { CookieService } from './services/cookie.service';
import { Response } from 'express';
import { DateService } from './services/date.service';
import { Token } from 'generated/prisma';
import { UserService } from './services';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly dateService: DateService,
    private readonly bcryptService: BcryptService,
    private readonly handleErrorsService: HandleErrorsService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
    private readonly cookieService: CookieService
  ) { }

  handleGoogleLogin(user: any, res: Response) {
    return res.redirect('http://localhost:4000/login')
  }

  // AuthService
  async create(createAuthDto: CreateUserDto) {
    const user = await this.userService.create(createAuthDto);
    const token = await this.tokenService.upsert(user.id);
    await this.mailService.sendAccountConfirmationEmail(user.email, token, user.name);
    return {
      message: 'User created successfully, check your email to confirm your account',
    };
  }


  async confirmAccount(token: Token['token']) {
    const userId = await this.tokenService.valid(token);
    await Promise.all([ this.userService.confirm(userId), this.tokenService.delete(userId) ])
    return {
      message: 'Account confirmed, welcome'
    }
  }

  async requestToken(requestTokenDto: RequestTokenDto) {
    const user = await this.userService.find(requestTokenDto.email);
    const token = await this.tokenService.upsert(user.id);
    await this.mailService.sendAccountConfirmationEmail(requestTokenDto.email, token, user.name);
    return {
      message: 'Token sent to your email'
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.find(forgotPasswordDto.email);
    const token = await this.tokenService.upsert(user.id);
    await this.mailService.sendPasswordResetEmail(forgotPasswordDto.email, token, user.name);
    return {
      message: 'The token to reset your account was sent to your email'
    }
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto, token: Token['token']) {
    await this.tokenService.valid(token);
    const user = await this.userService.find(recoverPasswordDto.email);
    const passwordHash = await this.bcryptService.hash(recoverPasswordDto.password);
    await Promise.all([ await this.userService.recover(user.id, passwordHash), await this.tokenService.delete(user.id)])
    return {
      message: 'Password changed successfully'
    }
  }

  async login(loginUserDto: LoginUserDto, response: Response) {
    const user = await this.userService.find(loginUserDto.email);
    if(!user.confirmed) throw new BadRequestException('User not confirmed, confirm your account');
    const match = await this.bcryptService.compare(loginUserDto.password, user.password!)
    if (!match) throw new BadRequestException('Password incorrect');
    const JWT = this.jwtService.getJwt({ id: user.id });
    const message = `Login successful, welcome ${user.name}`
    this.cookieService.setAuthCookie(JWT, response);
    return { message };
  }
}
