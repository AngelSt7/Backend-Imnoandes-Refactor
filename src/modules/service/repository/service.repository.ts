import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from '@/common/services';

@Injectable()
export class ServiceRepository {
    constructor (private readonly prisma: PrismaService) {}

    async findAll(
        prismaClient : PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.service.findMany({select: { id: true, service: true }});
    }
}
