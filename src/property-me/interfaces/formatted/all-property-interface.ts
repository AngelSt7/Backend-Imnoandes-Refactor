import { PROPERTY_TYPE, CURRENCY, PROPERTY_CATEGORY, Property, ResidentialProperty } from "generated/prisma";

export interface FormattedAllProperty {
    id: Property['id'];
    name: Property['name'];
    price: Property['price'];
    currency: CURRENCY;
    propertyType: PROPERTY_TYPE;
    propertyCategory: PROPERTY_CATEGORY;
    phone: Property['phone'];
    availability: Property['availability'];
    yearBuilt: Property['yearBuilt'];
    createdAt: Property['createdAt'];
    updatedAt: Property['updatedAt'];
    area: ResidentialProperty['area'] | undefined;
    bathrooms: ResidentialProperty['bathrooms'] | undefined;
    bedrooms: ResidentialProperty['bathrooms'] | undefined;
    location: Property['location'];
}