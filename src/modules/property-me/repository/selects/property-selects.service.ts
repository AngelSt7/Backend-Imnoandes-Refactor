import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

@Injectable()
export class PropertySelectsService { 

    preparedFindAll() {
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
            address: true,
            createdAt: true,
            slug: true,
            updatedAt: true,
            residential: {
                select: {
                    bedrooms: true,
                    bathrooms: true, area: true
                }
            },
            location: {
                select: {
                    province: { select: { province: true } },
                    district: { select: { district: true } },
                    slug: true
                }
            }
        }
    }

    preparedFindOne(){
        return {
            id: true,
            name: true,
            price: true,
            currency: true,
            propertyType: true,
            propertyCategory: true,
            availability: true,
            address: true,
            description: true,
            yearBuilt: true,
            latitude: true,
            longitude: true,
            phone: true,
            extraInfo: true,
            location: {
                select: {
                    department: { select: { id: true } },
                    province: { select: { id: true } },
                    district: { select: { id: true } }
                }
            },
            commercial: { select: { floor: true, hasParking: true, parkingSpaces: true } },
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
            address: true,
            yearBuilt: true,
            description: true,
            commercial: { select: { floor: true, hasParking: true, parkingSpaces: true } },
            residential: { select: { bedrooms: true, bathrooms: true, area: true, furnished: true, hasTerrace: true } },
            serviceToProperty: { select: { service: { select: { service: true, id: true } } } },
            location: {
                select: {
                    department: { select: { department: true } },
                    province: { select: { province: true } },
                    district: { select: { district: true } }
                }
            },
            images: { select: { url: true, type: true } },
        }
    }
}
