import { CreatePropertyMeDto, UpdatePropertyMeDto } from 'src/property-me/dto';
import { Injectable } from '@nestjs/common';
import { Prisma, Property, User } from 'generated/prisma';

@Injectable()
export class PropertyFactoryService {

    preparedCreate(newProperty: CreatePropertyMeDto, slug: Property['slug'], userId: User['id']): Prisma.PropertyCreateInput {
        return {
            name: newProperty.name,
            slug: slug,
            propertyType: newProperty.propertyType,
            currency: newProperty.currency,
            price: newProperty.price,
            location: newProperty.location,
            description: newProperty.description,
            propertyCategory: newProperty.propertyCategory,
            latitude: newProperty.latitude,
            longitude: newProperty.longitude,
            yearBuilt: newProperty.yearBuilt,
            user: { connect: { id: userId } },
            district: { connect: { id: newProperty.districtId } },
            department: { connect: { id: newProperty.departmentId } },
            province: { connect: { id: newProperty.provinceId } },
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

    preparedUpdate(updateProperty: UpdatePropertyMeDto, slug: Property['slug']): Prisma.PropertyUpdateInput {
        return {
            name: updateProperty.name,
            slug,
            propertyType: updateProperty.propertyType,
            currency: updateProperty.currency,
            price: updateProperty.price,
            location: updateProperty.location,
            description: updateProperty.description,
            yearBuilt: updateProperty.yearBuilt,
            latitude: updateProperty.latitude,
            longitude: updateProperty.longitude,
            propertyCategory: updateProperty.propertyCategory,
            district: { connect: { id: updateProperty.districtId } },
            department: { connect: { id: updateProperty.departmentId } },
            province: { connect: { id: updateProperty.provinceId } },
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

    preparedFindAll(): Prisma.PropertySelect {
        return {
            id: true,
            name: true,
            price: true,
            currency: true,
            propertyType: true,
            propertyCategory: true,
            availability: true,
            yearBuilt: true,
            phone: true,
            location: true,
            createdAt: true,
            updatedAt: true,
            residential: {
                select: {
                    bedrooms: true,
                    bathrooms: true, area: true
                }
            },
            province: { select: { province: true, } },
            district: { select: { district: true, } }
        }
    }

    preparedFindOne() {
        return {
            id: true,
            name: true,
            price: true,
            currency: true,
            propertyType: true,
            propertyCategory: true,
            availability: true,
            location: true,
            description: true,
            districtId: true,
            yearBuilt: true,
            departmentId: true,
            latitude: true,
            longitude: true,
            phone: true,
            provinceId: true,
            commercial: { select: { floor: true,  hasParking: true ,parkingSpaces: true } },
            residential: { select: { bedrooms: true, bathrooms: true, area: true, furnished: true, hasTerrace: true } },
            serviceToProperty: { select: { service: { select: { service: true, id: true } } } }
        }
    }

    preparedFindWhitRelations() {
        return {
            id: true,
            name: true,
            price: true,
            currency: true,
            propertyType: true,
            propertyCategory: true,
            availability: true,
            location: true,
            yearBuilt: true,
            description: true,
            commercial: { select: { floor: true,  hasParking: true ,parkingSpaces: true } },
            residential: { select: { bedrooms: true, bathrooms: true, area: true, furnished: true, hasTerrace: true } },
            serviceToProperty: { select: { service: { select: { service: true, id: true } } } },
            province: { select: { province: true, } },
            district: { select: { district: true, } },
            department: { select: { department: true, } },
            images: { select: { url: true, type: true } },
        }
    }
}
