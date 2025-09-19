import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PaginationService, PrismaService } from 'src/common/services';
import { PaginationPropertyPublicDto } from '../dto/pagination/pagination-property-public.dto';
import { PreparedFindCarrouselSelect, PreparedFindOneSelect, PreparedSearchSelect } from './selects/property-selects.types';


@Injectable()
export class PropertyRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly paginationService: PaginationService
    ) { }

    async search(
        filters: Prisma.PropertyWhereInput,
        select: PreparedSearchSelect,
        queryPage: PaginationPropertyPublicDto['page'],
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        const limit = 15
        const { skip, take } = this.paginationService.getPagination(queryPage, limit);

        const [data, count] = await Promise.all([
            prismaClient.property.findMany({ where: filters, select, skip, take }),
            prismaClient.property.count({ where: filters })
        ])

        const meta = this.paginationService.buildMeta(count, skip, take);
        
        return {
            data,
            meta
        }
    }

    async findOne(
        id: string,
        select: PreparedFindOneSelect,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.property.findFirst({
            where: { id: { startsWith: id, }, },
            select: select
        });
    }


    async findCarrousel(
        filters: Prisma.PropertyWhereInput,
        select: PreparedFindCarrouselSelect,
        quantity: number | undefined,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.property.findMany({
            where: filters,
            select: select,
            take: quantity || 3
        })
    }
}
