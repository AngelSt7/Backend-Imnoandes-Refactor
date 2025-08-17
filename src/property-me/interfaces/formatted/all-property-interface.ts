import { PROPERTY_TYPE, CURRENCY, PROPERTY_CATEGORY, Property, ResidentialProperty } from "generated/prisma";

export interface FormattedAllProperty {
    id: Property['id'];
    name: Property['name'];
    price: Property['price'];
    currency: CURRENCY;
    property_type: PROPERTY_TYPE;
    property_category: PROPERTY_CATEGORY;
    availability: Property['availability'];
    yearBuilt: Property['yearBuilt'];
    area: ResidentialProperty['area'] | undefined;
    bathrooms: ResidentialProperty['bathrooms'] | undefined;
    bedrooms: ResidentialProperty['bathrooms'] | undefined;
    location: Property['location'];
}