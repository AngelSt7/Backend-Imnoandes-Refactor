import { ConfigService } from '@nestjs/config/dist/config.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';
import { BcryptService } from './services/bcrypt.service';
import { CommonModule } from 'src/common/common.module';
import { TokenService } from './services/token.service';
import { Token, TokenSchema } from './entities/token.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtService } from './services/jwt.service';
import { CookieService } from './services/cookie.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema }
    ]),
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
    GoogleStrategy],
  exports: [JwtStrategy, PassportModule, MongooseModule, JwtModule, AuthService]
})
export class AuthModule {}
