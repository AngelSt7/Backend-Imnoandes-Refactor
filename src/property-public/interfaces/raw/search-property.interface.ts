import { CURRENCY, Property, PROPERTY_CATEGORY, PROPERTY_TYPE } from "generated/prisma";
import { PropertyImage, ResidentialInfo, CommercialInfo, DepartmentInfo, DistrictInfo, ServiceToProperty } from "./common";

export interface SearchPropertyBD {
  id: Property['id'];
  slug: Property['slug'];
  price: Property['price'];
  currency: CURRENCY;
  propertyType: PROPERTY_TYPE;
  description: Property['description'];
  propertyCategory: PROPERTY_CATEGORY;
  location: Property['location'];
  serviceToProperty: ServiceToProperty[];
  createdAt: Property['createdAt'];
  
  commercial?: CommercialInfo | null;
  residential: ResidentialInfo | null;
  department: DepartmentInfo | null;
  district: DistrictInfo | null;
  images: PropertyImage[] | null;
}
