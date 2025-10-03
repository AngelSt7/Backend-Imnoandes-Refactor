
import { Injectable } from '@nestjs/common';
import { User, Prisma } from 'generated/prisma';
import { PrismaService } from '@/common/services';

@Injectable()
export class UserRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    
    async updateInfo(id: User['id'], data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async findByCondition(key: keyof Prisma.UserWhereUniqueInput, value: string) {
        return this.prisma.user.findFirst({
            where: { [key]: value },
            select: { id: true, email: true, phone: true, password: true, authProvider: true },
        });
    }

}
