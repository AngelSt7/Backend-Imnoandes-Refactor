import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { Department, Location, Prisma, Province } from 'generated/prisma';
import { QuerySlugLocationDto } from '../dto/query-slug-location.dto';

@Injectable()
export class LocationRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getIdsLocations(dto: QuerySlugLocationDto) {
        for (const level of ['department', 'province', 'district'] as const) {
            const match = await this.prisma.location.findMany({
                where: { [level]: { slug: { in: dto.slugs, mode: 'insensitive' } } },
                select: {
                    departmentId: level === 'department',
                    provinceId:   level === 'province',
                    districtId:   level === 'district',
                },
            });

            if (match.length > 0) return match;
        }
    }

    async findLocations(dto: QuerySlugLocationDto) {
        const filters: Prisma.LocationWhereInput = {
            OR: [
                { slug: { in: dto.slugs, mode: 'insensitive' } }
            ]
        }

        return await this.prisma.location.findMany({
            where: filters,
            select: {
                id: true,
                slug: true,
                province: {
                    select: {
                        province: true
                    }
                },
                department: {
                    select: {
                        department: true
                    }
                },
                district: {
                    select: {
                        district: true
                    }
                }
            }
        })
    }


    async findDistricts(
        provinceId: Province['id'],
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.district.findMany({ where: { provinceId }, select: { id: true, district: true } });
    }

    async findProvinces(
        departmentId: Department['id'],
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.province.findMany({ where: { departmentId }, select: { id: true, province: true } });
    }

    async findLocation(departmentId: Location['departmentId'], provinceId: Location['provinceId'], districtId: Location['districtId']) {
        return this.prisma.location.findFirst({
            where: {
                departmentId,
                provinceId,
                districtId
            },
            select: {
                id: true,
                slug: true
            }
        })
    }

    async searchLocation(
        q: string,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        const query = q.trim().replace(/\s+/g, " ");
        const mode: Prisma.QueryMode = "insensitive";

        const filters: Prisma.LocationWhereInput = {
            OR: [
                { department: { department: { contains: query, mode } } },
                { province: { province: { contains: query, mode } } },
                { district: { district: { contains: query, mode } } }
            ]
        };

        return prismaClient.location.findMany({
            where: filters,
            select: {
                slug: true,
                department: { select: { department: true } },
                province: { select: { province: true } },
                district: { select: { district: true } }
            },
            take: 30
        });
    }
}
