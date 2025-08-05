import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interfaces';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { envs } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super({
      secretOrKey: envs.jwtSecret,
      jwtFromRequest:
        envs.jwtSource === 'COOKIE'
          ? ExtractJwt.fromExtractors([
              (req) => req?.cookies?.token || null,
            ])
          : ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<JwtPayloadInterface> {
    const user = await this.userModel
      .findOne({ _id: payload._id })
      .select('-password -createdAt -updatedAt -__v');
    if (!user) throw new UnauthorizedException('user not found');
    return user;
  }
}