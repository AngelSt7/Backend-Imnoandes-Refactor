import { CURRENCY, Department, District, Property, PROPERTY_CATEGORY, PROPERTY_TYPE, ResidentialProperty } from "generated/prisma";

export type PropertyType = "SALE" | "RENT";
export type PropertyCategory = "HOUSE" | "DEPARTMENT" | "LAND" | "COMMERCIAL";

export interface PropertyImage {
  url: string;
}

export interface ResidentialInfo {
  bedrooms: ResidentialProperty['bathrooms'];
  bathrooms: ResidentialProperty['bedrooms'];
  area: ResidentialProperty['area'];
}

export interface DepartmentInfo {
  department: Department['department'];
}

export interface DistrictInfo {
  slug: District['slug'];
}

export interface CarrouselPropertyBD {
  id: Property['id'];
  slug: Property['slug'];
  price: Property['price'];
  currency: CURRENCY; 
  propertyType: PROPERTY_TYPE;
  propertyCategory: PROPERTY_CATEGORY;
  location: Property['location'];
  createdAt: Property['createdAt'];
  residential: ResidentialInfo | null;
  department: DepartmentInfo | null;
  district: DistrictInfo | null;
  images: PropertyImage[] | null;
}
