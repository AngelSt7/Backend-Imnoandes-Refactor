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
    floor: number | undefined;
    parkingSpaces: boolean | undefined;
    bedrooms: number | undefined;
    bathrooms: number | undefined;
    area: number | undefined;
    furnished: boolean | undefined;
    servicesId: string[];

}