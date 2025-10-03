import { PropertySelectsService } from "./property-selects.service";

export type PreparedFindAll = ReturnType<PropertySelectsService['preparedFindAll']>;
export type PreparedFindOne = ReturnType<PropertySelectsService['preparedFindOne']>;
export type PreparedFindWhitRelations = ReturnType<PropertySelectsService['preparedFindWhitRelations']>;