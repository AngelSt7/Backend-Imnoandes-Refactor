import { PROPERTY_TYPE, PROPERTY_CATEGORY } from "generated/prisma";

export const propertyTypeMap: Record<PROPERTY_TYPE, string> = {
  SALE: "venta",
  RENT: "alquiler",
};

export const propertyCategoryMap: Record<PROPERTY_CATEGORY, string> = {
  HOUSE: "casa",
  APARTMENT: "departamento",
  LAND: "terreno",
  COMMERCIAL: "comercial",
  OFFICE: "oficina",
  WAREHOUSE: "almacen",
};
