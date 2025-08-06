import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config';
import { JwtPayloadInterface } from '../interfaces';
import { User } from 'generated/prisma';
import { UserService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService
  ) {
    super({
      secretOrKey: envs.jwtSecret,
      jwtFromRequest:
        envs.jwtSource === 'COOKIE'
          ? ExtractJwt.fromExtractors([
              (req) => {
                if(!req || !req.cookies) return null;
                return req.cookies.token || req.cookies.temp
              },
            ])
          : ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<Partial<User>> {
    const user = await this.userService.find(payload.id)
    if(!user) throw new UnauthorizedException('user not found');
    const { password : __, ...result } = user
    return result
  }
}