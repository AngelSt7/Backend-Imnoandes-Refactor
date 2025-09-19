import { Property } from "generated/prisma";
import { BasePropertyWithaddressIds, BasePropertyWithDescription, CommercialDetails, ResidentialDetailsWithTerrace, ServiceInfo } from "../shared";


interface Province {
  province: string;
}

interface Department {
  department: string;
}

interface District {
  district: string;
}

interface LocationDetails {
  province: Province | null;
  district: District | null;
  department: Department | null;
}

interface LocationInfo {
  location: LocationDetails;
}

export interface OnePropertyDB extends BasePropertyWithDescription {
  yearBuilt: Property['yearBuilt'];
  phone: Property['phone'];
  latitude: Property['latitude'];
  longitude: Property['longitude'];
  location: LocationInfo;
  residential: ResidentialDetailsWithTerrace | null;
  commercial: CommercialDetails | null;
  serviceToProperty: ServiceInfo[];
}