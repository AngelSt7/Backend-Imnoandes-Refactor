import { PROPERTY_TYPE, CURRENCY, PROPERTY_CATEGORY, Property, Province, District, Department, Image, IMAGE_TYPE } from "generated/prisma";
import { Images } from "../shared";

export interface FormattedDetailProperty {
    id: Property['id'];
    name: Property['name'];
    propertyType: PROPERTY_TYPE;
    currency: CURRENCY;
    propertyCategory: PROPERTY_CATEGORY;
    price: Property['price'];
    address: Property['address'];
    description: Property['description'];
    availability: Property['availability'];
    floor: number | undefined | null;
    hasParking: boolean | undefined | null;
    parkingSpaces: number | undefined | null;
    yearBuilt: Property['yearBuilt'];
    hasTerrace: boolean | undefined | null;
    bedrooms: number | undefined | null;
    bathrooms: number | undefined | null;
    area: number | undefined;
    furnished: boolean | undefined | null;
    services: string[];
    province: Province['province'];
    district: District['district'];
    departament: Department['department'];
    images: Images[] | null;
}
