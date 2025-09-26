import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { MODE } from '@/modules/auth/interfaces';

@Injectable()
export class RedirectService {

    mode(user: User) {
        return (!user.birthDate || !user.phone) ? { access: true, mode: MODE.TEMP } : { access: false, mode: MODE.SESSION };
    }

    url(mode: MODE, jwt?: string) {
        switch (mode) {
            case MODE.TEMP:
                return `/auth/complete-profile?token=${jwt}`
            case MODE.SESSION:
                return '/dashboard/venta-de-departamentos?page=1'
            case MODE.ERROR:
                return '/auth/login'
        }
    }


}
