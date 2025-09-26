import { UserRepository } from '@/modules/auth/repository';
import { Injectable } from '@nestjs/common';
import { AUTH_PROVIDERS, User } from 'generated/prisma';
import { oAuthGoogleDto } from '@/modules/auth/dto';

@Injectable()
export class oAuthService {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async findToGoogle(email: User['email']) {
        const user = await this.userRepository.find(email);
        if (user && user.authProvider !== AUTH_PROVIDERS.GOOGLE) {
            return { error: 'provider_mismatch', email };
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
