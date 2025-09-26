
import { AUTH_PROVIDERS } from 'generated/prisma';
import { envs } from '@/config';
import { Injectable } from '@nestjs/common';
import { oAuthService } from '@/modules/auth/services';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly oAuthService: oAuthService
  ) {
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
    const { name, emails } = profile;
    const result = await this.oAuthService.findToGoogle(emails?.[0].value.toString()!);

    if (result && 'error' in result) {
      return result;
    }

    if (!result) {
      const newUser = await this.oAuthService.createToGoogle({
        name: name?.givenName || '',
        lastname: name?.familyName || '',
        email: emails?.[0].value.toString()!,
        authProvider: AUTH_PROVIDERS.GOOGLE,
        confirmed: true
      });
      return newUser;
    }

    return result;
  }

}
