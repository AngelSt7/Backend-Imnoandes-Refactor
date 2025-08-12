import { BasePropertyWithLocationIds, CommercialDetails, ResidentialDetails, ServiceInfo } from "../shared";

export interface OnePropertyDB extends BasePropertyWithLocationIds {
  residential: ResidentialDetails | null;
  commercial: CommercialDetails | null;
  serviceToProperty: ServiceInfo[];
}