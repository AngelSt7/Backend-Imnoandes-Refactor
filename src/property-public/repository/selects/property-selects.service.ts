import { Injectable } from '@nestjs/common';
import { IMAGE_TYPE, Prisma } from 'generated/prisma';

@Injectable()
export class PropertySelectsService {

    preparedFindOne() {
        return {
            id: true,
            slug: true,
            name: true,
            address: true,
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
            extraInfo: true,
            createdAt: true,
            description: true,
            location: {
                select: {
                    slug: true,
                    department: { select: { department: true } },
                    province: { select: { province: true } },
                    district: { select: { district: true } },
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
                    hasTerrace: true,
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

    preparedSearch() {
        return {
            id: true,
            slug: true,
            price: true,
            currency: true,
            propertyType: true,
            propertyCategory: true,
            address: true,
            createdAt: true,
            description: true,
            commercial: {
                select: {
                    floor: true,
                    hasParking: true,
                    parkingSpaces: true
                }
            },
            residential: {
                select: {
                    bedrooms: true,
                    bathrooms: true,
                    area: true
                }
            },
            serviceToProperty: {
                select: {
                    service: {
                        select: {
                            service: true
                        }
                    }
                }
            },
            location: {
                select: {
                    slug: true,
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
            address: true,
            createdAt: true,
            residential: {
                select: {
                    bedrooms: true,
                    bathrooms: true,
                    area: true
                }
            },
            location: {
                select: {
                    slug: true,
                    department: { select: { department: true } },
                    district: { select: { district: true } }
                }
            },
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
