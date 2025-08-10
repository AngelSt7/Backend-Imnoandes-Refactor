import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { Prisma, Property, User } from 'generated/prisma';
import { UpdatePropertyMeDto } from '../dto';

@Injectable()
export class PropertyRepository {
    private logger = new Logger(PropertyRepository.name)
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(data: Prisma.PropertyCreateInput) {
        return await this.prisma.property.create({ data });
    }

    async findAll(userId: User['id'], filters: Prisma.PropertyWhereInput) {
        return await this.prisma.property.findMany({
            where: { userId, ...filters },
            select: {
                id: true, name: true, price: true, currency: true,
                property_type: true, property_category: true, availability: true, location: true,
                residential: { select: { bedrooms: true, bathrooms: true, area: true } },
                province: { select: { province: true, } },
                district: { select: { district: true, } }
            }
        });
    }

    async findOne(id: Property['id']) {
        return await this.prisma.property.findUnique({
            where: { id },
            include: {
                commercial: { select: { floor: true, parkingSpaces: true } },
                residential: { select: { bedrooms: true, bathrooms: true, area: true, furnished: true } },
                serviceToProperty: { select: { service: { select: { service: true, id: true } } } }
            }
        });
    }

    async update(id: Property['id'], data: UpdatePropertyMeDto, slug: Property['slug'], userId: User['id']) {
        return await this.prisma.property.update({
            where: { id },
            data: {
                name: data.name,
                slug: slug,
                property_type: data.property_type,
                currency: data.currency,
                price: data.price,
                location: data.location,
                description: data.description,
                availability: data.availability,
                property_category: data.property_category,
                districtId: data.districtId,
                departmentId: data.departmentId,
                provinceId: data.provinceId,
                residential: {
                    update: {
                        bedrooms: data.bedrooms,
                        bathrooms: data.bathrooms,
                        area: data.area,
                        furnished: data.furnished
                    }
                },
                commercial: {
                    update: {
                        floor: data.floor,
                        parkingSpaces: data.parkingSpaces
                    }
                },
                serviceToProperty: {
                    create: data.servicesId?.map(s => ({ serviceId: s }))
                }
            }
        });
    }

    async changeStatus(id: Property['id'], availability: Property['availability']) {
        return await this.prisma.property.update({ where: { id }, data: { availability: !availability } });
    }
}
