// property.all.types.ts
import { BasePropertyMinimal, ResidentialDetails, ProvinceInfo, DistrictInfo } from '../shared';

export interface AllPropertiesBD extends BasePropertyMinimal {
  yearBuilt: number;
  residential: ResidentialDetails | null;
  province: ProvinceInfo;
  district: DistrictInfo;
}
