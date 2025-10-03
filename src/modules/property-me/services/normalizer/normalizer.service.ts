import { Injectable } from '@nestjs/common';
import { UpdatePropertyMeDto } from '@/modules/property-me/dto';
import { PROPERTY_CATEGORY } from 'generated/prisma';

@Injectable()
export class NormalizerService {

    normalizeProperty(property: UpdatePropertyMeDto): UpdatePropertyMeDto {
        switch (property.propertyCategory) {
            case PROPERTY_CATEGORY.HOUSE:
            case PROPERTY_CATEGORY.APARTMENT:
                return property;
            case PROPERTY_CATEGORY.OFFICE:
            case PROPERTY_CATEGORY.COMMERCIAL:
            case PROPERTY_CATEGORY.WAREHOUSE:
                return { ...property, bedrooms: null }
            case PROPERTY_CATEGORY.LAND:
                return {
                    ...property,
                    bedrooms: null,
                    bathrooms: null,
                    servicesId: [],
                    furnished: false,
                    hasTerrace: false,
                    hasParking: false,
                    parkingSpaces: null,
                    floor: 1,
                    yearBuilt: null,
                    extraInfo: null
                }
        }
    }

}
