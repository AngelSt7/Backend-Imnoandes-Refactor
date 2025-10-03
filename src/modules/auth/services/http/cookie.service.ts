import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { envs } from '@/config';
import { MODE } from '@/modules/auth/interfaces';

@Injectable()
export class CookieService {

    setAuthCookie(token: string, response: Response, isTemp = false) {
        response.cookie(MODE.SESSION, token, {
            httpOnly: true,
            secure: envs.nodeEnv === 'PRODUCTION',
            sameSite: 'lax',
            maxAge: isTemp ? 1000 * 60 * 5 : 1000 * 60 * 60 * 24 * 7,
            path: '/',
        });
    }

    setErrorCookie(response: Response) {
        response.cookie(MODE.ERROR, 'La cuenta con la que intentas ingresar ya esta registrada con proveedor local', {
            httpOnly: false,
            secure: envs.nodeEnv === 'PRODUCTION',
            sameSite: 'lax',
            maxAge: 1000 * 60,
            path: '/'
        });
    }

    clearAuthCookie(res: Response) {
        res.clearCookie("SESSION", { path: '/' });
    }

    getMaxAge(mode: MODE) {
        if (mode === MODE.SESSION) return 1000 * 60 * 60 * 24 * 7;
        if (mode === MODE.TEMP) return 1000 * 60 * 60;
        if (mode === MODE.ERROR) return 1000 * 60
    }
}
