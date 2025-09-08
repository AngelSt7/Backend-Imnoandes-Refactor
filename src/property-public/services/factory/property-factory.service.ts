import { Injectable } from '@nestjs/common';
import { IMAGE_TYPE, Prisma } from 'generated/prisma';

@Injectable()
export class PropertyFactoryService {

    preparedFindOne() {
        return {
            id: true,
            slug: true,
            name: true,
            location: true,
            latitude: true,
            longitude: true,
            price: true,
            currency: true,
            availability: true,
            propertyType: true,
            propertyCategory: true,
            commercial: {
                select: {
                    floor: true,
                    hasParking: true,
                    parkingSpaces: true
                }
            },
            createdAt: true,
            department: {
                select: {
                    department: true,
                }
            },
            description: true,
            district: {
                select: {
                    district: true,
                    slug: true
                }
            },
            extraInfo: true,
            province: {
                select: {
                    province: true
                }
            },
            phone: true,
            updatedAt: true,
            yearBuilt: true,
            serviceToProperty: {
                select: {
                    service: {
                        select: {
                            service: true
                        }
                    }
                }
            },
            residential: {
                select: {
                    bedrooms: true,
                    bathrooms: true,
                    area: true,
                    furnished: true,
                    hasTerrace: true

                }
            },
            images: {
                select: {
                    url: true,
                    type: true
                }
            }
        }
    }


    preparedFindCarrousel() {
        return {
            id: true,
            slug: true,
            price: true,
            currency: true,
            propertyType: true,
            propertyCategory: true,
            location: true,
            createdAt: true,
            residential: {
                select: {
                    bedrooms: true,
                    bathrooms: true,
                    area: true
                }
            },
            department: { select: { department: true, } },
            district: { select: { slug: true, } },
            images: {
                where: {
                    type: IMAGE_TYPE.MAIN
                },
                select: {
                    url: true
                }
            }
        }
    }


}
