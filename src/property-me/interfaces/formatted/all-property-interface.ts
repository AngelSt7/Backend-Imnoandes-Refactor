import { PROPERTY_TYPE, CURRENCY, PROPERTY_CATEGORY } from "generated/prisma";

export interface FormattedAllProperty {
    id: string;
    name: string;
    price: number;
    currency: CURRENCY;
    property_type: PROPERTY_TYPE;
    property_category: PROPERTY_CATEGORY;
    availability: boolean;
    area: number | undefined;
    bathrooms: number | undefined;
    bedrooms: number | undefined;
    location: string;
}