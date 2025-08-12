// property.detail.types.ts
import { 
  BasePropertyWithDescription, ResidentialDetails, CommercialDetails, ServiceInfo,
  MainImageInfo, ImagesGalleryInfo, ProvinceInfo, DistrictInfo, DepartamentInfo
} from '../shared';

export interface DetailPropertyBD extends BasePropertyWithDescription {
  residential: ResidentialDetails | null;
  commercial: CommercialDetails | null;
  serviceToProperty: ServiceInfo[];
  mainImage: MainImageInfo | null;
  imagesGallery: ImagesGalleryInfo[];
  province: ProvinceInfo;
  district: DistrictInfo;
  departament: DepartamentInfo;
}
