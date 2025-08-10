import { Injectable } from '@nestjs/common';
import { Prisma, Property, User } from 'generated/prisma';
import { CreatePropertyMeDto } from 'src/property-me/dto';

@Injectable()
export class PropertyFactoryService {

    preparedCreate(newProperty: CreatePropertyMeDto, slug: Property['slug'], userId: User['id']): Prisma.PropertyCreateInput {
        return {
            name: newProperty.name,
            slug: slug,
            property_type: newProperty.property_type,
            currency: newProperty.currency,
            price: newProperty.price,
            location: newProperty.location,
            description: newProperty.description,
            availability: newProperty.availability,
            property_category: newProperty.property_category,
            user: { connect: { id: userId } },
            district: { connect: { id: newProperty.districtId } },
            departament: { connect: { id: newProperty.departmentId } },
            province: { connect: { id: newProperty.provinceId } },
            residential: {
                create: {
                    bedrooms: newProperty.bedrooms,
                    bathrooms: newProperty.bathrooms,
                    area: newProperty.area,
                    furnished: newProperty.furnished
                }
            },
            commercial: {
                create: {
                    floor: newProperty.floor,
                    parkingSpaces: newProperty.parkingSpaces
                }
            },
            serviceToProperty: {
                create: newProperty.servicesId.map(s => ({ serviceId: s }))
            }

        }
    }
}
