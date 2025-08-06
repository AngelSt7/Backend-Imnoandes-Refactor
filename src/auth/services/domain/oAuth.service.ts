import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.respository';
import { AUTH_PROVIDERS, User } from 'generated/prisma';
import { oAuthGoogleDto } from '../../dto/oauth/google/oauth-google.dto';

@Injectable()
export class oAuthService {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async findToGoogle(email: User['email']) {
        const user = await this.userRepository.find(email);
        if (user && user.authProvider !== AUTH_PROVIDERS.GOOGLE) {
            throw new ForbiddenException('Invalid provider for this user');
        }
        return user
    }

    async createToGoogle(oAuthGoogleDto: oAuthGoogleDto) {
        return await this.userRepository.createToGoogle({
            name: oAuthGoogleDto.name,
            lastname: oAuthGoogleDto.lastname,
            email: oAuthGoogleDto.email,
            authProvider: AUTH_PROVIDERS.GOOGLE,
            confirmed: true
        })
    }

}
