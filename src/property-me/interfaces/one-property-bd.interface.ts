import { CommercialProperty, CURRENCY, Departament, District, Property, PROPERTY_CATEGORY, PROPERTY_TYPE, Province, ResidentialProperty, Service, User } from "generated/prisma";

export interface OnePropertyDB extends BaseProperty {
  residential: ResidentialDetails | null;
  commercial: CommercialDetails | null;
  serviceToProperty: ServiceInfo[];
}

interface ResidentialDetails {
  bedrooms: ResidentialProperty['bedrooms'];
  bathrooms: ResidentialProperty['bathrooms'];
  area: ResidentialProperty['area'];
  furnished: ResidentialProperty['furnished'];
}

interface CommercialDetails {
  floor: CommercialProperty['floor'];
  parkingSpaces: CommercialProperty['parkingSpaces'];
}

interface ServiceInfo {
  service: {
    id: Service['id'];
    service: Service['service'];
  };
}

interface BaseProperty {
  id: Property['id'];
  name: Property['name'];
  property_type: PROPERTY_TYPE;
  currency: CURRENCY;
  property_category: PROPERTY_CATEGORY;
  price: Property['price'];
  location: Property['location'];
  description: Property['description'];
  availability: Property['availability'];
  userId: User['id'];
  districtId: District['id'];
  departmentId: Departament['id'];
  provinceId: Province['id'];
}


export interface FormattedOneProperty {
    id: string;
    name: string;
    property_type: PROPERTY_TYPE;
    currency: CURRENCY;
    property_category: PROPERTY_CATEGORY;
    price: number;
    location: string;
    description: string;
    availability: boolean;
    userId: string;
    districtId: string;
    departmentId: string;
    provinceId: string;
    floor: number | undefined;
    parkingSpaces: boolean | undefined;
    bedrooms: number | undefined;
    bathrooms: number | undefined;
    area: number | undefined;
    furnished: boolean | undefined;
    servicesId: {
        id: string;
        name: string;
    }[];
}