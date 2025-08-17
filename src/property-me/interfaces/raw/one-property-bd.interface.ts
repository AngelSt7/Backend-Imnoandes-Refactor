import { BasePropertyWithLocationIds, CommercialDetails, ResidentialDetailsWithTerrace, ServiceInfo } from "../shared";

export interface OnePropertyDB extends BasePropertyWithLocationIds {
  yearBuilt: number;
  latitude: number;
  longitude: number;
  residential: ResidentialDetailsWithTerrace | null;
  commercial: CommercialDetails | null;
  serviceToProperty: ServiceInfo[];
}