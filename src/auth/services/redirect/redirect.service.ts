import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { MODE } from 'src/auth/interfaces';

@Injectable()
export class RedirectService {

    mode(user: User): MODE {
        return (!user.birthDate || !user.phone) ? MODE.TEMP : MODE.SESSION
    }

    url(mode: MODE, jwt?: string){
        switch (mode) {
            case MODE.TEMP:
                return `http://localhost:3000/auth/complete-profile?token=${jwt}`
            case MODE.SESSION:
                return 'http://localhost:3000/success'
            case MODE.ERROR:
                return 'http://localhost:3000/auth/login'
        }
    }


}
