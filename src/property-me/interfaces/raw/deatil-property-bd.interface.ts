// property.detail.types.ts
import { 
  BasePropertyWithDescription, ResidentialDetails, CommercialDetails, ServiceInfo,
  MainImageInfo, ImagesGalleryInfo, ProvinceInfo, DistrictInfo, DepartmentInfo,
  ResidentialDetailsWithTerrace
} from '../shared';

export interface DetailPropertyBD extends BasePropertyWithDescription {
  yearBuilt: number;
  latitude: number;
  longitude: number;
  residential: ResidentialDetailsWithTerrace | null;
  commercial: CommercialDetails | null;
  serviceToProperty: ServiceInfo[];
  mainImage: MainImageInfo | null;
  imagesGallery: ImagesGalleryInfo[];
  province: ProvinceInfo;
  district: DistrictInfo;
  department: DepartmentInfo;
}
