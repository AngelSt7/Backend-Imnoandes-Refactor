import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    private readonly salt = 10;

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.salt);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
