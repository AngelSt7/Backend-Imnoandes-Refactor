import {
  CURRENCY,
  IMAGE_TYPE,
  Property,
  PROPERTY_CATEGORY,
  PROPERTY_TYPE,
  Service,
} from "generated/prisma";

// Subtipos base
export interface Department {
  department: string;
}

export interface Province {
  province: string | null;
}

export interface District {
  district: string | null;
  slug: string | null;
}

export interface CommercialInfo {
  floor: number | null;
  hasParking: boolean | null;
  parkingSpaces: number | null;
}

export interface ResidentialInfo {
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  furnished: boolean | null;
  hasTerrace: boolean | null;
}

// **Adaptado al resultado actual de Prisma**
export interface ServiceToProperty {
  service: {
    service: Service['service'];
  };
}
export interface PropertyImage {
  url: string;
  type: IMAGE_TYPE;
}

// Interface principal
export interface OnePropertyDB {
  id: Property['id'];
  slug: Property['slug'];
  name: Property['name'];
  location: Property['location'];
  latitude: Property['latitude'];
  longitude: Property['longitude'];
  price: Property['price'];
  currency: CURRENCY;
  availability: boolean;
  propertyType: PROPERTY_TYPE;
  propertyCategory: PROPERTY_CATEGORY;
  createdAt: Date | string;
  updatedAt: Date | string;
  yearBuilt: number | null;
  description: string;
  extraInfo: string | null;
  phone: string;

  department: Department | null;
  province: Province | null;
  district: District | null;

  commercial?: CommercialInfo | null;
  residential?: ResidentialInfo | null;

  // ✅ Cambiado para reflejar exactamente lo que Prisma devuelve
  serviceToProperty: ServiceToProperty[];

  images: PropertyImage[];
}
