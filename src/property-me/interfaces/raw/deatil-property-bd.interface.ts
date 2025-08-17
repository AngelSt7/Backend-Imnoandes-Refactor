// property.detail.types.ts
import { Property } from 'generated/prisma';
import { 
  BasePropertyWithDescription, ResidentialDetails, CommercialDetails, ServiceInfo,
  MainImageInfo, ImagesGalleryInfo, ProvinceInfo, DistrictInfo, DepartmentInfo,
  ResidentialDetailsWithTerrace
} from '../shared';

export interface DetailPropertyBD extends BasePropertyWithDescription {
  yearBuilt: Property['yearBuilt'];
  latitude: Property['latitude'];
  longitude: Property['longitude'];
  residential: ResidentialDetailsWithTerrace | null;
  commercial: CommercialDetails | null;
  serviceToProperty: ServiceInfo[];
  mainImage: MainImageInfo | null;
  imagesGallery: ImagesGalleryInfo[];
  province: ProvinceInfo;
  district: DistrictInfo;
  department: DepartmentInfo;
}
