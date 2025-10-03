
import { PaginationService, PrismaService } from '@/common/services';
import { PreparedSearchSelect } from '@/modules/property-public/repository/selects';
import { Injectable } from '@nestjs/common';
import { Prisma, Property, User } from 'generated/prisma';
import { QueryPaginationDto } from '../dto';

@Injectable()
export class FavoriteRepository {

    constructor(
        private readonly prisma: PrismaService,
        private readonly paginationService: PaginationService
    ) { }

    async findProperty(
        id: Property['id'],
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.property.findUnique({ where: { id, availability: true }, select: { id: true } });
    }

    async addFavorite(
        propertyId: Property['id'],
        userId: string,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.favorite.create({ data: { propertyId, userId } });
    }

    async getFavoritesIds(userId: User['id']) {
        return await this.prisma.favorite.findMany({ where: { userId }, select: { propertyId: true } });
    }

    async listFavorites(
        userId: User['id'],
        select: PreparedSearchSelect,
        query: QueryPaginationDto['page'],
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        const { skip, take } = this.paginationService.getPagination(query, 15);

        const [data, count] = await Promise.all([
            prismaClient.favorite.findMany({ where: { userId }, skip, take, select: { property: { select } } }),
            prismaClient.favorite.count({ where: { userId }, skip, take })
        ])

        const meta = this.paginationService.buildMeta(count, skip, take);

        return {
            data: data.map(d => d.property),
            meta
        }
    }

    async remove(
        userId: User['id'],
        propertyId: Property['id'],
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.favorite.deleteMany({ where: { userId, propertyId } });
    }

}
