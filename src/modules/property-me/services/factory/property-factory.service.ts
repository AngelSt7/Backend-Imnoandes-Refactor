import { CreatePropertyMeDto, UpdatePropertyMeDto } from '@/modules/property-me/dto';
import { Injectable } from '@nestjs/common';
import { Location, Prisma, Property, User } from 'generated/prisma';

@Injectable()
export class PropertyFactoryService {

    preparedCreate(
        newProperty: CreatePropertyMeDto,
        locationId: Location['id'],
        slug: Property['slug'],
        userId: User['id']): Prisma.PropertyCreateInput {
        return {
            name: newProperty.name,
            slug: slug,
            propertyType: newProperty.propertyType,
            currency: newProperty.currency,
            price: newProperty.price,
            address: newProperty.address,
            description: newProperty.description,
            propertyCategory: newProperty.propertyCategory,
            latitude: newProperty.latitude,
            longitude: newProperty.longitude,
            yearBuilt: newProperty.yearBuilt,
            user: { connect: { id: userId } },
            location: { connect: { id: locationId } },
            extraInfo: newProperty.extraInfo,
            phone: newProperty.phone,
            residential: {
                create: {
                    bedrooms: newProperty.bedrooms,
                    bathrooms: newProperty.bathrooms,
                    area: newProperty.area,
                    furnished: newProperty.furnished,
                    hasTerrace: newProperty.hasTerrace
                }
            },
            commercial: {
                create: {
                    floor: newProperty.floor,
                    hasParking: newProperty.hasParking,
                    parkingSpaces: newProperty.parkingSpaces
                }
            },
            ...(newProperty.servicesId?.length ? {
                serviceToProperty: {
                    create: newProperty.servicesId.map(s => ({ serviceId: s }))
                }
            } : {})

        }
    }

    preparedUpdate(updateProperty: UpdatePropertyMeDto, locationId: Location['id'], slug: Property['slug']): Prisma.PropertyUpdateInput {
        return {
            name: updateProperty.name,
            slug,
            propertyType: updateProperty.propertyType,
            currency: updateProperty.currency,
            price: updateProperty.price,
            address: updateProperty.address,
            description: updateProperty.description,
            yearBuilt: updateProperty.yearBuilt,
            latitude: updateProperty.latitude,
            longitude: updateProperty.longitude,
            propertyCategory: updateProperty.propertyCategory,
            location: { connect: { id: locationId } },
            phone: updateProperty.phone,
            residential: {
                update: {
                    bedrooms: updateProperty.bedrooms,
                    bathrooms: updateProperty.bathrooms,
                    area: updateProperty.area,
                    furnished: updateProperty.furnished,
                    hasTerrace: updateProperty.hasTerrace
                }
            },
            commercial: {
                update: {
                    floor: updateProperty.floor,
                    hasParking: updateProperty.hasParking,
                    parkingSpaces: updateProperty.parkingSpaces
                }
            },
            ...(updateProperty.servicesId?.length ? {
                serviceToProperty: {
                    create: updateProperty.servicesId.map(s => ({ serviceId: s }))
                }
            } : {})
        }
    }

}
