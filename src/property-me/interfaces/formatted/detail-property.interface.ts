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
    floor: number | undefined;
    parkingSpaces: boolean | undefined;
    bedrooms: number | undefined;
    bathrooms: number | undefined;
    area: number | undefined;
    furnished: boolean | undefined;
    services: string[];
    province: string;
    district: string;
    departament: string;
    mainImage: string | null;
    imagesGallery: string[];
}
