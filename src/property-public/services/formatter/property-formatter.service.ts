
import { Injectable } from '@nestjs/common';
import { propertyCategoryMap, propertyTypeMap } from 'src/property-public/constants/property-public-maps';
import { CarrouselPropertyBD, OnePropertyDB, SearchPropertyBD } from 'src/property-public/interfaces';

@Injectable()
export class PropertyFormatterService {

    formatSearch(properties: SearchPropertyBD[]) {
        return properties.map(property => ({
            id: property.id,
            slug: property.slug,
            price: property.price,
            currency: property.currency,
            propertyType: property.propertyType,
            propertyCategory: property.propertyCategory,
            location: property.location,
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
            department: property.department?.department,
            district: property.district?.district?.toLowerCase(),
            url: this.formatUrl(property.propertyType, property.propertyCategory, property.district?.slug, property.slug, property.id)
        }))
    }

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
            services: property.serviceToProperty.map(stp => stp.service.service),
            images: property.images.map(i => ({
                url: i.url,
                type: i.type
            })),
            url: this.formatUrl(property.propertyType, property.propertyCategory, property.district?.slug, property.slug, property.id)
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
            image: property.images?.[0]?.url ?? null,
            department: property.department?.department,
            district: property.district?.district,
            url: this.formatUrl(property.propertyType, property.propertyCategory, property.district?.slug, property.slug, property.id)
        }))
    }

    private formatUrl(type, category, districtSlug, propertySlug, propertyId) {
        const base = 'inmueble/clasificado/';
        const propetyType = propertyTypeMap[type]
        const propertyCategory = propertyCategoryMap[category]
        const district = districtSlug
        const property = propertySlug
        const shortId = propertyId.split('-')[0]
        return `${base}/${propetyType}-de-${propertyCategory}-en-${district}-${property}-${shortId}`
    }


}
