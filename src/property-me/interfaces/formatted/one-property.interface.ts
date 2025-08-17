import { PROPERTY_TYPE, CURRENCY, PROPERTY_CATEGORY } from "generated/prisma";

export interface PropertyFormatted {
    id: string;
    name: string;
    property_type: PROPERTY_TYPE;
    currency: CURRENCY;
    property_category: PROPERTY_CATEGORY;
    price: number;
    location: string;
    description: string;
    availability: boolean;
    districtId: string;
    departmentId: string;
    provinceId: string;
    floor: number | undefined | null;
    hasParking: boolean | undefined | null;
    parkingSpaces: number | undefined | null;
    bedrooms: number | undefined | null;
    yearBuilt: number;
    latitude: number;
    longitude: number;
    hasTerrace: boolean | undefined | null;
    bathrooms: number | undefined | null;
    area: number | undefined;
    furnished: boolean | undefined | null;
    servicesId: string[];

}