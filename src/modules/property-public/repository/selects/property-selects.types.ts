import { PropertySelectsService } from "./property-selects.service";

export type PreparedFindOneSelect = ReturnType<PropertySelectsService['preparedFindOne']>;
export type PreparedFindCarrouselSelect = ReturnType<PropertySelectsService['preparedFindCarrousel']>;
export type PreparedSearchSelect = ReturnType<PropertySelectsService['preparedSearch']>;