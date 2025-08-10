import { CURRENCY, Departament, District, Property, PROPERTY_CATEGORY, PROPERTY_TYPE, Province, ResidentialProperty, } from "generated/prisma";

export interface AllPropertiesBD {
    id: Property['id'];
    name: Property['name'];
    property_type: PROPERTY_TYPE;
    currency: CURRENCY;
    property_category: PROPERTY_CATEGORY;
    price: Property['price'];
    location: Property['location'];
    availability: Property['availability'];
    residential: ResidentialDetails | null,
    province: ProvinceInfo,
    district: DistrictInfo
}

interface ResidentialDetails {
  bedrooms: ResidentialProperty['bedrooms'];
  bathrooms: ResidentialProperty['bathrooms'];
  area: ResidentialProperty['area'];
}


interface ProvinceInfo {
  province: Province['province'];
}

interface DistrictInfo {
  district: District['district'];
}