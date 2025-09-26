import { PropertyRepository } from "@/modules/property-me/repository";

export type PropertiesFormatted = Awaited<ReturnType<PropertyRepository['findAll']>>['data'];
export type PropertyFormatted = Awaited<ReturnType<PropertyRepository['findOne']>>;
export type PropertyDetail = Awaited<ReturnType<PropertyRepository['findOneWithRelations']>>;