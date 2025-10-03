import { PROPERTY_TYPE, CURRENCY, PROPERTY_CATEGORY, Property } from "generated/prisma";

export interface PropertyFormatted {
    id: string | null;
    name: string;
    propertyType: PROPERTY_TYPE;
    currency: CURRENCY;
    propertyCategory: PROPERTY_CATEGORY;
    price: number;
    address: string;
    phone: Property['phone'];
    description: string;
    availability: boolean;
    districtId: string;
    departmentId: string;
    provinceId: string;
    floor: number | undefined | null;
    hasParking: boolean | undefined | null;
    parkingSpaces: number | undefined | null;
    bedrooms: number | undefined | null;
    yearBuilt: number | null;
    latitude: number;
    longitude: number;
    hasTerrace: boolean | undefined | null;
    bathrooms: number | undefined | null;
    area: number | undefined;
    furnished: boolean | undefined | null;
    servicesId: string[];
}