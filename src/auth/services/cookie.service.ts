import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { envs } from 'src/config';

@Injectable()
export class CookieService {

    setAuthCookie(token: string, response: Response) {
        response.cookie('token', token, {
            httpOnly: true,
            secure: envs.nodeEnv === 'PRODUCTION',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
    }

    clearAuthCookie(res: Response) {
        res.clearCookie('token');
    }
}
