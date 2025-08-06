import { Injectable, NotFoundException } from '@nestjs/common';
import { Token, User } from 'generated/prisma';
import { TokenRepository } from '../../repository';
import { DateService } from '../utils';

@Injectable()
export class TokenService {
    constructor(
        private readonly tokenRepository: TokenRepository,
        private readonly dateService: DateService
    ) { }

    public async valid(token: Token['token']) {
        const tokenDB = await this.tokenRepository.findOne(token)
        if (!tokenDB) throw new NotFoundException('Token not found, request a new one')
        if(tokenDB.expiresAt < new Date()) {
            await this.delete(tokenDB.userId)
            throw new NotFoundException('Token expired, request a new one')
        }
        return tokenDB.userId
    }

    public generate() {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    public async upsert(id: User['id']) {
        await this.delete(id)
        const token = this.generate()
        const expires = this.dateService.expiresAt()
        await this.tokenRepository.create(Number(token), expires, id)
        return token
    }

    public async delete(id: User['id']) {
        return await this.tokenRepository.delete(id)
    }
}
