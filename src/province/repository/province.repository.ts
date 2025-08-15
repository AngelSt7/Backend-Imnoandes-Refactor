import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { Department, Prisma } from 'generated/prisma';

@Injectable()
export class ProvinceRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(
        departmentId: Department['id'],
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.province.findMany({ where: { departmentId }, select: { id: true, province: true } });
    }
}
