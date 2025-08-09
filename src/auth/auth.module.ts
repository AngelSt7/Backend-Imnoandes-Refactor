import { AuthController, AuthService } from ".";
import { CommonModule } from "src/common/common.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy, GoogleStrategy } from "./strategies";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserRepository, TokenRepository } from "./repository";
import { BcryptService, oAuthService,TokenService, JwtService, CookieService, DateService, UserService } from "./services";
import { RedirectService } from './services/redirect/redirect.service';
import { MessageService } from './services/utils/message.service';

@Module({
  imports: [
    CommonModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, BcryptService, TokenService, JwtService, CookieService, 
    GoogleStrategy, UserRepository, DateService, TokenRepository, UserService, oAuthService, RedirectService, MessageService],
  exports: [JwtStrategy, PassportModule, JwtModule, AuthService, AuthModule]
})
export class AuthModule {}
