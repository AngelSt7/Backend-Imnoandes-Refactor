import { CURRENCY, Property, PROPERTY_CATEGORY, PROPERTY_TYPE } from "generated/prisma";
import { DepartmentInfo, ProvinceInfo, DistrictInfo } from "src/property-me";
import { CommercialInfo, ResidentialInfo, PropertyImage, ServiceToProperty } from "./common";



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

  department: DepartmentInfo | null;
  province: ProvinceInfo | null;
  district: DistrictInfo | null;

  commercial?: CommercialInfo | null;
  residential?: ResidentialInfo | null;

  serviceToProperty: ServiceToProperty[];
  images: PropertyImage[];
}
