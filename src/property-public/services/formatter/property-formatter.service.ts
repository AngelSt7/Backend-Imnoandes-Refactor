
import { Injectable } from '@nestjs/common';
import { CarrouselPropertyBD } from 'src/property-public/interfaces/raw/carrousel-property-bd.interface';
import { PROPERTY_CATEGORY, PROPERTY_TYPE } from 'generated/prisma';
import { OnePropertyDB } from 'src/property-public/interfaces/raw/one-property-bd.interface';

const propertyTypeMap: Record<PROPERTY_TYPE, string> = {
    SALE: "venta",
    RENT: "alquiler",
};

const propertyCategoryMap: Record<PROPERTY_CATEGORY, string> = {
    HOUSE: "casa",
    APARTMENT: "departamento",
    LAND: "terreno",
    COMMERCIAL: "comercial",
    OFFICE: "oficina",
    WAREHOUSE: "almacen",
};

@Injectable()
export class PropertyFormatterService {



    formatOne(property: OnePropertyDB | null) {
        if (!property) return null
        return {
            name: property.name,
            location: property.location,
            latitude: property.latitude,
            longitude: property.longitude,
            price: property.price,
            currency: property.currency,
            availability: property.availability,
            propertyType: property.propertyType,
            propertyCategory: property.propertyCategory,
            floor: property.commercial?.floor,
            hasParking: property.commercial?.hasParking,
            parkingSpaces: property.commercial?.parkingSpaces,
            bedrooms: property.residential?.bedrooms,
            bathrooms: property.residential?.bathrooms,
            area: property.residential?.area,
            furnished: property.residential?.furnished,
            hasTerrace: property.residential?.hasTerrace,
            createdAt: property.createdAt,
            updatedAt: property.updatedAt,
            yearBuilt: property.yearBuilt,
            description: property.description,
            extraInfo: property.extraInfo,
            phone: property.phone,
            department: property.department?.department,
            province: property.province?.province,
            district: property.district?.district,
            serviceToProperty: property.serviceToProperty.map(stp => stp.service.service),
            images: property.images.map(i => ({
                url: i.url,
                type: i.type
            })),
            url: `/inmueble/clasificado/${propertyTypeMap[property.propertyType]}-de-${propertyCategoryMap[property.propertyCategory]}-en-${property.district?.slug}--${property.department?.department.toLowerCase()}-${property.slug}-${property.id.split('-')[0]}`
        };
    }


    formatCarrousel(properties: CarrouselPropertyBD[]) {
        return properties.map(property => ({
            id: property.id,
            slug: property.slug,
            price: property.price,
            currency: property.currency,
            propertyType: property.propertyType,
            propertyCategory: property.propertyCategory,
            location: property.location,
            createdAt: property.createdAt,
            bedrooms: property.residential?.bedrooms,
            bathrooms: property.residential?.bathrooms,
            area: property.residential?.area,
            image: property.images?.[0]?.url,
            department: property.department?.department,
            district: property.district?.slug,
            url: `/inmueble/clasificado/${propertyTypeMap[property.propertyType]}-de-${propertyCategoryMap[property.propertyCategory]}-en-${property.district?.slug}--${property.department?.department.toLowerCase()}-${property.slug}-${property.id.split('-')[0]}`

        }))
    }


}
