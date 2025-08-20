import { PROPERTY_TYPE, CURRENCY, PROPERTY_CATEGORY, Property, Province, District, Department, ImagesGallery, MainImage } from "generated/prisma";

export interface FormattedDetailProperty {
    id: Property['id'];
    name: Property['name'];
    property_type: PROPERTY_TYPE;
    currency: CURRENCY;
    property_category: PROPERTY_CATEGORY;
    price: Property['price'];
    location: Property['location'];
    description: Property['description'];
    availability: Property['availability'];
    floor: number | undefined | null;
    hasParking: boolean | undefined | null;
    parkingSpaces: number | undefined | null;
    yearBuilt: Property['yearBuilt'];
    latitude: Property['latitude'];
    longitude: Property['longitude'];
    hasTerrace: boolean | undefined | null;
    bedrooms: number | undefined | null;
    bathrooms: number | undefined | null;
    area: number | undefined;
    furnished: boolean | undefined | null;
    services: string[];
    province: Province['province'];
    district: District['district'];
    departament: Department['department'];
    mainImage: MainImage['url'] | null;
    imagesGallery: ImagesGallery['url'][];
}
