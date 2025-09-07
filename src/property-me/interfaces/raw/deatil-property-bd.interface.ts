// property.detail.types.ts
import { Image, IMAGE_TYPE, Property } from 'generated/prisma';
import {
  BasePropertyWithDescription, CommercialDetails, ServiceInfo, ProvinceInfo, DistrictInfo, DepartmentInfo,
  ResidentialDetailsWithTerrace,
  Images
} from '../shared';



export interface DetailPropertyBD extends BasePropertyWithDescription {
  yearBuilt: Property['yearBuilt'];
  residential: ResidentialDetailsWithTerrace | null;
  commercial: CommercialDetails | null;
  serviceToProperty: ServiceInfo[];
  images: Images[] | null;
  province: ProvinceInfo;
  district: DistrictInfo;
  department: DepartmentInfo;
}
