import { PROPERTY_TYPE, CURRENCY, PROPERTY_CATEGORY } from "generated/prisma";

export interface FormattedDetailProperty {
    id: string;
    name: string;
    property_type: PROPERTY_TYPE;
    currency: CURRENCY;
    property_category: PROPERTY_CATEGORY;
    price: number;
    location: string;
    description: string;
    availability: boolean;
    floor: number | undefined | null;
    hasParking: boolean | undefined | null;
    parkingSpaces: number | undefined | null;
    yearBuilt: number;
    latitude: number;
    longitude: number;
    hasTerrace: boolean | undefined | null;
    bedrooms: number | undefined | null;
    bathrooms: number | undefined | null;
    area: number | undefined;
    furnished: boolean | undefined | null;
    services: string[];
    province: string;
    district: string;
    departament: string;
    mainImage: string | null;
    imagesGallery: string[];
}
