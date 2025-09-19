// property.all.types.ts
import { Property } from 'generated/prisma';
import { BasePropertyMinimal, ResidentialDetails, ProvinceInfo, DistrictInfo } from '../shared';

interface Province {
  province: string;
}

interface District {
  district: string;
}

interface LocationDetails {
  province: Province | null;
  district: District | null;
}

interface LocationInfo {
  location: LocationDetails;
}

export interface AllPropertiesBD extends BasePropertyMinimal {
  yearBuilt: Property['yearBuilt'];
  createdAt: Property['createdAt'];
  updatedAt: Property['updatedAt'];
  phone: Property['phone'];
  residential: ResidentialDetails | null;
  location: LocationDetails
}
