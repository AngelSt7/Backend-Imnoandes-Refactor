import { AuthController, AuthService } from ".";
import { BcryptService, TokenService, CookieService, JwtService } from "./services";
import { CommonModule } from "src/common/common.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy, GoogleStrategy } from "./strategies";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserRepository, TokenRepository } from "./repository";
import { DateService } from './services/date.service';
import { UserService } from './services/user.service';


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
    GoogleStrategy, UserRepository, DateService, TokenRepository, UserService],
  exports: [JwtStrategy, PassportModule, JwtModule, AuthService]
})
export class AuthModule {}
