import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { MODE } from '@/modules/auth/interfaces';
import { envs } from '@/config';

@Injectable()
export class RedirectService {

    private readonly frontendUrl = envs.frontendUrl

    mode(user: User) {
        return (!user.birthDate || !user.phone) ? { access: true, mode: MODE.TEMP } : { access: false, mode: MODE.SESSION };
    }

    url(mode: MODE, jwt?: string) {
        switch (mode) {
            case MODE.TEMP:
                return `${this.frontendUrl}/auth/completar-perfil?token=${jwt}`
            case MODE.SESSION:
                return `${this.frontendUrl}/es`
            case MODE.ERROR:
                return `${this.frontendUrl}/auth/iniciar-sesion`
        }
    }


}
