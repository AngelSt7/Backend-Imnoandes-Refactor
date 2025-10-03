import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { BcryptService, CookieService, DateService, MessageService, oAuthService, RedirectService, TokenService, UserService } from "./services";
import { CommonModule } from "@/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GoogleStrategy, JwtStrategy } from "./strategies";
import { JwtModule } from "@nestjs/jwt";
import { JwtService } from './services/crypto/jwt.service';
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TokenRepository, UserRepository } from "./repository";

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
    GoogleStrategy, UserRepository, TokenRepository, UserService, oAuthService, RedirectService, MessageService, DateService],
  exports: [JwtStrategy, PassportModule, JwtModule, AuthService, AuthModule]
})
export class AuthModule {}
