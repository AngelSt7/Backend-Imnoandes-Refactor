import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config';
import { JwtPayloadInterface } from '../interfaces';
import { UserService } from '../services';
import { JwtUser } from '../interfaces';

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
                return req.cookies.TOKEN || req.cookies.TEMP
              },
            ])
          : ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<JwtUser> {
    const user = await this.userService.find(payload.id)
    if(!user) throw new UnauthorizedException('user not found');
    const { password : __, ...result } = user
    return {
      ...result,
      exp: payload.exp
    }
  }
}