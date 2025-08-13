import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { Prisma, Property, User } from 'generated/prisma';

@Injectable()
export class PropertyRepository {
    private logger = new Logger(PropertyRepository.name)
    constructor(
        private readonly prisma: PrismaService
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
        select: Prisma.PropertySelect,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.property.findMany({ where: { userId, ...filters }, select });
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
