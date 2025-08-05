
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-google-oauth20';
import { envs } from 'src/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: envs.googleClientId,
      clientSecret: envs.googleClientSecret,
      callbackURL: envs.googleCallbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    // Aquí puedes buscar o crear el usuario en tu base de datos
    // Devuelve lo que quieras que se almacene en `req.user`
    return {
      provider: 'google',
      googleId: profile.id,
      email: profile.emails?.[0].value,
      name: profile.displayName,
      avatar: profile.photos?.[0].value,
    };
  }
}
