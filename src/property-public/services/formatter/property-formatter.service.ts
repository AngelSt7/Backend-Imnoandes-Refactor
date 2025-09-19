
import { Injectable } from '@nestjs/common';
import { propertyCategoryMap, propertyTypeMap } from 'src/property-public/constants/property-public-maps';
import { PropertyRepository } from 'src/property-public/repository';

export type SearchProperty = Awaited<ReturnType<PropertyRepository['search']>>['data']
export type OneProperty = Awaited<ReturnType<PropertyRepository['findOne']>>
export type CarrouselProperty = Awaited<ReturnType<PropertyRepository['findCarrousel']>>

@Injectable()
export class PropertyFormatterService {

    formatSearch(properties: SearchProperty) {
        return properties.map(property => ({
            id: property.id,
            slug: property.slug,
            price: property.price,
            currency: property.currency,
            propertyType: property.propertyType,
            propertyCategory: property.propertyCategory,
            address: property.address,
            description: property.description,
            hasParking: property.commercial?.hasParking,
            parkingSpaces: property.commercial?.parkingSpaces,
            createdAt: property.createdAt,
            bedrooms: property.residential?.bedrooms,
            bathrooms: property.residential?.bathrooms,
            services: property.serviceToProperty.map(stp => stp.service.service),
            area: property.residential?.area,
            images: property.images?.map(i => ({
                url: i.url,
                type: i.type
            })),
            department: property.location.department?.department,
            district: property.location.district?.district,
            url: this.formatUrl(property.propertyType, property.propertyCategory, property.location.slug, property.slug, property.id)
        }))
    }

    formatOne(property: NonNullable<OneProperty>) {
        return {
            name: property.name,
            address: property.address,
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
            department: property.location.department?.department,
            province: property.location.province?.province,
            district: property.location.district?.district,
            services: property.serviceToProperty.map(stp => stp.service.service),
            images: property.images.map(i => ({
                url: i.url,
                type: i.type
            })),
            url: this.formatUrl(property.propertyType, property.propertyCategory, property.location.slug, property.slug, property.id)
        };
    }


    formatCarrousel(properties: CarrouselProperty) {
        return properties.map(property => ({
            id: property.id,
            slug: property.slug,
            price: property.price,
            currency: property.currency,
            propertyType: property.propertyType,
            propertyCategory: property.propertyCategory,
            address: property.address,
            createdAt: property.createdAt,
            bedrooms: property.residential?.bedrooms,
            bathrooms: property.residential?.bathrooms,
            area: property.residential?.area,
            image: property.images?.[0]?.url ?? null,
            department: property.location.department?.department,
            district: property.location.district?.district,
            url: this.formatUrl(property.propertyType, property.propertyCategory, property.location.slug, property.slug, property.id)
        }))
    }

    private formatUrl(type, category, slugLocation, slugProperty, propertyId) {
        const base = '/es/inmueble/clasificado';
        const propetyType = propertyTypeMap[type]
        const propertyCategory = propertyCategoryMap[category]
        const shortId = propertyId.split('-')[0]
        return `${base}/${propetyType}-de-${propertyCategory}-en-${slugLocation}-${slugProperty}-${shortId}`
    }


}
