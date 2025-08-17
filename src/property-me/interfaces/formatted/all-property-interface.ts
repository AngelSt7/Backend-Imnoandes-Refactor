import { PROPERTY_TYPE, CURRENCY, PROPERTY_CATEGORY } from "generated/prisma";

export interface FormattedAllProperty {
    id: string;
    name: string;
    price: number;
    currency: CURRENCY;
    property_type: PROPERTY_TYPE;
    property_category: PROPERTY_CATEGORY;
    availability: boolean;
    yearBuilt: number;
    area: number | undefined;
    bathrooms: number | undefined | null;
    bedrooms: number | undefined | null;
    location: string;
}