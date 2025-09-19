import { 
  PROPERTY_TYPE, CURRENCY, PROPERTY_CATEGORY, 
  Property, Province, District, Department, 
  ResidentialProperty, CommercialProperty, Service, 
  IMAGE_TYPE
} from "generated/prisma";

export interface BasePropertyMinimal {
  id: Property['id'];
  name: Property['name'];
  propertyType: PROPERTY_TYPE;
  currency: CURRENCY;
  propertyCategory: PROPERTY_CATEGORY;
  price: Property['price'];
  address: Property['address'];
  availability: Property['availability'];
}

export interface BasePropertyWithDescription extends BasePropertyMinimal {
  description: Property['description'];
}

export interface BasePropertyWithaddressIds extends BasePropertyWithDescription {
  districtId: District['id'];
  departmentId: Department['id'];
  provinceId: Province['id'];
}

export interface ResidentialDetails {
  bedrooms: ResidentialProperty['bedrooms'];
  bathrooms: ResidentialProperty['bathrooms'];
  area: ResidentialProperty['area'];
  furnished?: ResidentialProperty['furnished'];
}

export interface ResidentialDetailsWithTerrace extends ResidentialDetails {
  hasTerrace: ResidentialProperty['hasTerrace'];
}

export interface CommercialDetails {
  floor: CommercialProperty['floor'];
  hasParking: CommercialProperty['hasParking'];
  parkingSpaces: CommercialProperty['parkingSpaces'];
}

export interface ServiceInfo {
  service: {
    id: Service['id'];
    service: Service['service'];
  };
}

export interface ProvinceInfo {
  province: Province['province'];
}

export interface DistrictInfo {
  district: District['district'];
  slug?: District['slug'];
}

export interface DepartmentInfo {
  department: Department['department'];
}

export interface Images {
  url: string
  type: IMAGE_TYPE
}