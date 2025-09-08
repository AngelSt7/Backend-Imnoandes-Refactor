import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/common/services';
import { PropertyFactoryService } from '../services/factory';


type PreparedFindOneSelect = ReturnType<PropertyFactoryService['preparedFindOne']>;
type PreparedFindCarrouselSelect = ReturnType<PropertyFactoryService['preparedFindCarrousel']>;

@Injectable()
export class PropertyRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async search(
        filters: Prisma.PropertyWhereInput,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.property.findMany({
            where: filters,
        })
    }

    async findOne(
        id: string,
        select: PreparedFindOneSelect,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.property.findFirst({
            where: { id: { startsWith: id, }, },
            select: select
        }) ;
    }


    async findCarrousel(
        filters: Prisma.PropertyWhereInput,
        select: PreparedFindCarrouselSelect,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.property.findMany({
            where: filters,
            select: select,
            take: 3
        })
    }
}
