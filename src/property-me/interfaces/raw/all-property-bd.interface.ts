// property.all.types.ts
import { Property } from 'generated/prisma';
import { BasePropertyMinimal, ResidentialDetails, ProvinceInfo, DistrictInfo } from '../shared';

export interface AllPropertiesBD extends BasePropertyMinimal {
  yearBuilt: Property['yearBuilt'];
  residential: ResidentialDetails | null;
  province: ProvinceInfo;
  district: DistrictInfo;
}
