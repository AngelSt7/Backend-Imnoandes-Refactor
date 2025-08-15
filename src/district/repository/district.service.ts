import { Injectable } from '@nestjs/common';
import { Prisma, Province } from 'generated/prisma';
import { PrismaService } from 'src/common/services';

@Injectable()
export class DistrictRepository {
    constructor (
        private readonly prisma: PrismaService
    ) {}

    async findAll(
        provinceId: Province['id'],
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ){
        return await prismaClient.district.findMany({ where: { provinceId }, select: { id: true, district: true } });
    }
}
