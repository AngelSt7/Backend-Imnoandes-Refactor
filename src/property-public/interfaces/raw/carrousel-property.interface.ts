import { CURRENCY, Property, PROPERTY_CATEGORY, PROPERTY_TYPE } from "generated/prisma";
import { PropertyImage, ResidentialInfo, DepartmentInfo, DistrictInfo } from "./common";

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
