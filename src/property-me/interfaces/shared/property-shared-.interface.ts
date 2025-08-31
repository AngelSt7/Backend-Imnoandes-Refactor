import { 
  PROPERTY_TYPE, CURRENCY, PROPERTY_CATEGORY, 
  Property, Province, District, Department, 
  ResidentialProperty, CommercialProperty, Service, 
  ImageMain, ImagesGallery 
} from "generated/prisma";

export interface BasePropertyMinimal {
  id: Property['id'];
  name: Property['name'];
  property_type: PROPERTY_TYPE;
  currency: CURRENCY;
  property_category: PROPERTY_CATEGORY;
  price: Property['price'];
  location: Property['location'];
  availability: Property['availability'];
}

export interface BasePropertyWithDescription extends BasePropertyMinimal {
  description: Property['description'];
}

export interface BasePropertyWithLocationIds extends BasePropertyWithDescription {
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
}

export interface DepartmentInfo {
  department: Department['department'];
}

export interface ImageMainInfo {
  url: ImageMain['url'] | null;
}

export interface ImagesGalleryInfo {
  url: ImagesGallery['url'];
}
