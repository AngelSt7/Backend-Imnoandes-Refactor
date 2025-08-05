import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BcryptService } from './services/bcrypt.service';
import { HandleErrorsService } from 'src/common/services/handle-errors.service';
import { CreateUserDto, LoginUserDto, RequestTokenDto, ForgotPasswordDto, RecoverPasswordDto } from './dto';
import { MailService } from 'src/common/services/mail.service';
import { TokenService } from './services/token.service';
import { JwtService } from './services/jwt.service';
import { Token } from './entities/token.entity';
import { CookieService } from './services/cookie.service';
import { Response } from 'express';
import { envs } from 'src/config';

@Injectable()
export class AuthService {

  private readonly context = 'auth'

  constructor(
    private readonly bcryptService: BcryptService,
    private readonly handleErrorsService: HandleErrorsService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
    private readonly cookieService: CookieService
  ) { }

  handleGoogleLogin(user: any, res: Response) {
    return res.redirect('http://localhost:4000/login')
  }

  async create(createAuthDto: CreateUserDto) {
    try {
        return createAuthDto
    } catch (error) {
      this.handleErrorsService.handleError(error, this.context);
    }
  }

  async confirmAccount(token: string) {
    // const userId = await this.tokenService.validToken(token);
    // await this.authModel.updateOne({ _id: userId }, { isActive: true });
    // await this.tokenService.deleteToken(token);
    // return {
    //   message: 'Account confirmed'
    // }
  }

  async requestToken(requestTokenDto: RequestTokenDto) {
    // const user = await this.authModel.findOne({ email: requestTokenDto.email });
    // if (!user) throw new NotFoundException('User not found');
    // const token = await this.tokenService.upsertToken(user._id);
    // await this.mailService.sendAccountConfirmationEmail(requestTokenDto.email, token, user.name);
    // return {
    //   message: 'Token sent to your email'
    // }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    // const user = await this.authModel.findOne({ email: forgotPasswordDto.email });
    // if (!user) throw new NotFoundException('User not found');
    // const token = await this.tokenService.upsertToken(user._id);
    // await this.mailService.sendPasswordResetEmail(forgotPasswordDto.email, token, user.name);
    // return {
    //   message: 'The token to reset your account was sent to your email'
    // }
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto, token: Token['token']) {
    // await this.tokenService.validToken(token);
    // const user = await this.authModel.findOne({ email: recoverPasswordDto.email });
    // if (!user) throw new NotFoundException('User not found');
    // const passwordHash = await this.bcryptService.hash(recoverPasswordDto.password);
    // await this.authModel.updateOne({ _id: user._id }, { password: passwordHash });
    // await this.tokenService.deleteToken(token);
    // return {
    //   message: 'Password changed successfully'
    // }
  }

  async login(loginUserDto: LoginUserDto, response: Response) {
  //   const user = await this.authModel.findOne({ email: loginUserDto.email })
  //   if (!user) throw new NotFoundException('User not found');
  //   const validPassword = await this.bcryptService.compare(loginUserDto.password, user.password)
  //   if (!validPassword) throw new BadRequestException('Password incorrect');
  //   if (!user.isActive) throw new BadRequestException('User not active, request a new token');

  //   const JWT = this.jwtService.getJwt({ _id: user._id });
  //   const message = `Login successful, welcome ${user.name}`

  //   if (envs.jwtSource === 'COOKIE') {
  //     this.cookieService.setAuthCookie(JWT, response);
  //     return { message };
  //   }

  //   return { message, token: JWT }
  // }
}}
