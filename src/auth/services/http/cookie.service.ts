import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { MODE } from 'src/auth/interfaces';
import { envs } from 'src/config';

@Injectable()
export class CookieService {

    setAuthCookie(mode: MODE,token: string, response: Response) {
        response.cookie(mode, token, {
            httpOnly: true,
            secure: envs.nodeEnv === 'PRODUCTION',
            sameSite: 'lax',
            maxAge: this.getMaxAge(mode)
        });
    }
    
    clearAuthCookie(mode: MODE, res: Response) {
        res.clearCookie(mode);
    }
    
    getMaxAge(mode: MODE)  {
        if(mode === MODE.SESSION) return 1000 * 60 * 60 * 24 * 7;
        if(mode === MODE.TEMP) return 1000 * 60 * 5
    }
}
