import { CreatePropertyMeDto, UpdatePropertyMeDto } from 'src/property-me/dto';
import { Injectable } from '@nestjs/common';
import { Prisma, Property, User } from 'generated/prisma';

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
            department: { connect: { id: newProperty.departmentId } },
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

    preparedUpdate(updateProperty: UpdatePropertyMeDto, slug: Property['slug']): Prisma.PropertyUpdateInput {
        return {
            name: updateProperty.name,
            slug,
            property_type: updateProperty.property_type,
            currency: updateProperty.currency,
            price: updateProperty.price,
            location: updateProperty.location,
            description: updateProperty.description,
            availability: updateProperty.availability,
            property_category: updateProperty.property_category,
            district: { connect: { id: updateProperty.districtId } },
            department: { connect: { id: updateProperty.departmentId } },
            province: { connect: { id: updateProperty.provinceId } },

            residential: {
                update: {
                    bedrooms: updateProperty.bedrooms,
                    bathrooms: updateProperty.bathrooms,
                    area: updateProperty.area,
                    furnished: updateProperty.furnished
                }
            },
            commercial: {
                update: {
                    floor: updateProperty.floor,
                    parkingSpaces: updateProperty.parkingSpaces
                }
            },
            serviceToProperty: {
                create: updateProperty.servicesId?.map(s => ({ serviceId: s }))
            }
        }
    }

    preparedFindAll(): Prisma.PropertySelect {
        return {
            id: true,
            name: true,
            price: true,
            currency: true,
            property_type: true,
            property_category: true,
            availability: true,
            location: true,
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
            property_type: true,
            property_category: true,
            availability: true,
            location: true,
            description: true,
            districtId: true,
            departmentId: true,
            provinceId: true,
            commercial: { select: { floor: true, parkingSpaces: true } },
            residential: { select: { bedrooms: true, bathrooms: true, area: true, furnished: true } },
            serviceToProperty: { select: { service: { select: { service: true, id: true } } } }
        }
    }

    preparedFindWhitRelations() {
        return {
            id: true,
            name: true,
            price: true,
            currency: true,
            property_type: true,
            property_category: true,
            availability: true,
            location: true,
            description: true,
            commercial: { select: { floor: true, parkingSpaces: true } },
            residential: { select: { bedrooms: true, bathrooms: true, area: true, furnished: true } },
            serviceToProperty: { select: { service: { select: { service: true, id: true } } } },
            province: { select: { province: true, } },
            district: { select: { district: true, } },
            department: { select: { department: true, } },
            mainImage: { select: { url: true } },
            imagesGallery: { select: { url: true } }
        }
    }
}
