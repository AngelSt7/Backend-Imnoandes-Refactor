import { Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Token, User } from 'generated/prisma';
import { TokenRepository } from '@/modules/auth/repository';
import { DateService } from '../utils';

@Injectable()
export class TokenService {
    constructor(
        private readonly tokenRepository: TokenRepository,
        private readonly dateService: DateService
    ) { }

    public async valid(input: Token['token'] | Token['id']) {
        const tokenDB = isUUID(input)
            ? await this.tokenRepository.findById(input as Token['id'])
            : await this.tokenRepository.findOne(input as Token['token']);

        if (!tokenDB)  throw new NotFoundException('El token no existe');

        if (tokenDB.expiresAt < new Date()) {
            await this.delete(tokenDB.userId);
            throw new NotFoundException('Token expirado, solicite uno nuevo');
        }

        return {
            userId: tokenDB.userId,
            id: tokenDB.id,
            token: tokenDB.token
        };
    }

    public generate() {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    public async upsert(id: User['id']) {
        await this.delete(id)
        const token = this.generate()
        const expires = this.dateService.expiresAt()
        const newToken = await this.tokenRepository.create(Number(token), expires, id)
        return {
            id: newToken.id,
            token: newToken.token.toString()
        }
    }

    public async delete(id: User['id']) {
        return await this.tokenRepository.delete(id)
    }
}
