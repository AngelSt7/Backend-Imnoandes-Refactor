import { Injectable } from '@nestjs/common';
import { JwtService as JwtServiceInject } from '@nestjs/jwt';
import { JwtPayloadInterface } from 'src/auth/interfaces';

@Injectable()
export class JwtService {

    constructor(
        private readonly jwtService: JwtServiceInject
    ) {}

    public getJwt(payload : JwtPayloadInterface) : string {
        return this.jwtService.sign(payload);
    }

    public decodeJwt(token : string) : JwtPayloadInterface {
        return this.jwtService.verify(token);
    }

    public getJwtTemp(payload: JwtPayloadInterface): string {
        return this.jwtService.sign(payload, { expiresIn: '15m' });
    }
}
