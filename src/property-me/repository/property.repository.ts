import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreatePropertyDB } from '../interfaces';
import { CreatePropertyMeDto } from '../dto';
import { Property, User } from 'generated/prisma';

@Injectable()
export class PropertyRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    create(property: CreatePropertyMeDto, slug: Property['slug'], userId: User['id']) {
        return this.prisma.property.create({ data: {
            property_type: property.property_type,
            currency: property.currency,
            price: property.price,
            location: property.location,
            description: property.description,
            availability: property.availability,
            userId: userId,
            districtId: property.districtId,
            departmentId: property.departmentId,
            provinceId: property.provinceId,
            slug: slug,
            name: property.name,
            property_category: property.property_category,
            residential: {
                create: {
                    bedrooms: property.bedrooms,
                    bathrooms: property.bathrooms,
                    area: property.area,
                    furnished: property.furnished
                }
            },
            commercial: {
                create: {
                    floor: property.floor,
                    parkingSpaces: property.parkingSpaces
                }
            },
            serviceToProperty: {
                createMany: {
                    data: property.serviceIds.map(serviceId => ({ serviceId }))
                }
            }
            
        } });
    }
}
