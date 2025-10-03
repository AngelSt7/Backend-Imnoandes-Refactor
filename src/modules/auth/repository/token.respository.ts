import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/services';
import { Token, User } from 'generated/prisma';

@Injectable()
export class TokenRepository {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(token: Token['token'], expiresAt: Date, userId: User['id']) {
        return await this.prisma.token.create({ data: { token, expiresAt, userId } });
    }

    async findOne(token: Token['token']) {
        return await this.prisma.token.findFirst({ where: { token: token } });
    }

    async findById(id: Token['id']) {
        return await this.prisma.token.findUnique({ where: { id } });
    }

    async delete(userId: User['id']) {
        return await this.prisma.token.deleteMany({ where: { userId } });
    }

}
