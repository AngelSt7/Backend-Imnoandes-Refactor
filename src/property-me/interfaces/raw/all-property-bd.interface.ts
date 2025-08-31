// property.all.types.ts
import { Property } from 'generated/prisma';
import { BasePropertyMinimal, ResidentialDetails, ProvinceInfo, DistrictInfo } from '../shared';

export interface AllPropertiesBD extends BasePropertyMinimal {
  yearBuilt: Property['yearBuilt'];
  createdAt: Property['createdAt'];
  updatedAt: Property['updatedAt'];
  phone: Property['phone'];
  residential: ResidentialDetails | null;
  province: ProvinceInfo;
  district: DistrictInfo;
}
