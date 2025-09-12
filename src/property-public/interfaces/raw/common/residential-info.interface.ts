import { ResidentialProperty } from "generated/prisma";

export interface ResidentialInfo {
  bedrooms: ResidentialProperty['bedrooms'] | number | null;
  bathrooms: ResidentialProperty['bathrooms'] | number | null;
  area: ResidentialProperty['area'] | number | null;
  furnished?: boolean | null;
  hasTerrace?: boolean | null;
}
