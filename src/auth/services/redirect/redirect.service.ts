import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { MODE } from 'src/auth/interfaces';

@Injectable()
export class RedirectService {

    mode(user: User): MODE {
        return (!user.birthDate || !user.phone) ? MODE.TEMP : MODE.SESSION
    }

    url(mode: MODE, jwt: string){
        return mode === MODE.TEMP
            ? `http://localhost:4000/auth/complete-profile?token=${jwt}`
            : 'http://localhost:4000/welcome'
    }
}
