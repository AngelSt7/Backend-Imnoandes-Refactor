import { Property } from "generated/prisma";
import { BasePropertyWithLocationIds, CommercialDetails, ResidentialDetailsWithTerrace, ServiceInfo } from "../shared";

export interface OnePropertyDB extends BasePropertyWithLocationIds {
  yearBuilt: Property['yearBuilt'];
  latitude: Property['latitude'];
  longitude: Property['longitude'];
  residential: ResidentialDetailsWithTerrace | null;
  commercial: CommercialDetails | null;
  serviceToProperty: ServiceInfo[];
}