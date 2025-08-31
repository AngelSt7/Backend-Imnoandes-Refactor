import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Property, User } from 'generated/prisma';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { PaginationService } from '../../common/services/pagination/pagination.service';
import { PaginationPropertyMeDto } from '../dto';


@Injectable()
export class PropertyRepository {
    private logger = new Logger(PropertyRepository.name)
    constructor(
        private readonly prisma: PrismaService,
        private readonly paginationService: PaginationService
    ) { }

    async create(
        data: Prisma.PropertyCreateInput,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.property.create({ data });
    }

    async findAll(
        userId: User['id'], 
        filters: Prisma.PropertyWhereInput,
        params: PaginationPropertyMeDto,
        select: Prisma.PropertySelect,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        const { skip, take } = this.paginationService.getPagination(params.page, params.limit);
        const [ data, count ] = await Promise.all([
            prismaClient.property.findMany({ where: { userId, ...filters }, skip, take, select }),
            prismaClient.property.count({ where: { userId, ...filters } })
        ])
        const meta = this.paginationService.buildMeta(count, skip, take);
        return {
            data,
            meta
        }
    }

    async findOne<T extends Prisma.PropertySelect>(
        id: Property['id'],
        userId: User['id'],
        select: T,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
    return await prismaClient.property.findUnique({
        where: { id, userId },
        select
    });
    }


    async findOneWithRelations<T extends Prisma.PropertySelect>(
        id: Property['id'],
        userId: User['id'],
        select: T,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return prismaClient.property.findUnique({
            where: { id, userId },
            select
        });
    }

    async update(
        id: Property['id'], 
        data: Prisma.PropertyUpdateInput,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.property.update({ where: { id }, data });
    }

    async changeStatus(
        id: Property['id'],
        availability: Property['availability'],
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.property.update({ where: { id }, data: { availability: !availability } });
    }
}
