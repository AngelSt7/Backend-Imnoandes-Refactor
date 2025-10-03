import { Injectable } from '@nestjs/common';
import { PropertiesFormatted, PropertyDetail, PropertyFormatted } from './property-formatter.types';
import { propertyCategoryMap, propertyTypeMap } from '@/modules/property-public/constants';

@Injectable()
export class PropertyFormatterService {

    formatAll(properties: PropertiesFormatted) {
        return properties.map(property => ({
            id: property.id,
            name: property.name,
            price: property.price,
            currency: property.currency,
            phone: property.phone,
            propertyType: property.propertyType,
            propertyCategory: property.propertyCategory,
            availability: property.availability,
            createdAt: property.createdAt,
            updatedAt: property.updatedAt,
            area: property.residential?.area,
            yearBuilt: property.yearBuilt,
            bathrooms: property.residential?.bathrooms,
            bedrooms: property.residential?.bedrooms,
            address: `${property.location.district?.district}, ${property.location.province?.province}`,
            url: this.formatUrl(property.propertyType, property.propertyCategory, property.location.slug, property.slug, property.id)
        }))
    }

    formatOne(property: NonNullable<PropertyFormatted>) {
        return {
            id: property.id,
            name: property?.name,
            propertyType: property?.propertyType,
            currency: property?.currency,
            propertyCategory: property?.propertyCategory,
            price: property?.price,
            yearBuilt: property?.yearBuilt,
            latitude: property?.latitude,
            longitude: property?.longitude,
            hasTerrace: property?.residential?.hasTerrace,
            address: property?.address,
            description: property?.description,
            availability: property?.availability,
            districtId: property.location.district?.id,
            departmentId: property.location.department?.id,
            provinceId: property.location.province?.id,
            phone: property.phone,
            floor: property.commercial?.floor,
            hasParking: property.commercial?.hasParking,
            parkingSpaces: property.commercial?.parkingSpaces,
            bedrooms: property.residential?.bedrooms,
            bathrooms: property.residential?.bathrooms,
            area: property.residential?.area,
            furnished: property.residential?.furnished,
            extraInfo: property.extraInfo,
            servicesId: property.serviceToProperty.map(stp => ({ id: stp.service.id })).map(stp => stp.id)
        }
    }

    formatDetail(property: NonNullable<PropertyDetail>) {
        return {
            id: property.id,
            name: property.name,
            propertyType: property.propertyType,
            currency: property.currency,
            propertyCategory: property.propertyCategory,
            price: property.price,
            yearBuilt: property.yearBuilt,
            hasTerrace: property.residential?.hasTerrace,
            address: property.address,
            description: property.description,
            availability: property.availability,
            floor: property.commercial?.floor,
            hasParking: property.commercial?.hasParking,
            parkingSpaces: property.commercial?.parkingSpaces,
            bedrooms: property.residential?.bedrooms,
            bathrooms: property.residential?.bathrooms,
            area: property.residential?.area,
            furnished: property.residential?.furnished,
            services: property.serviceToProperty.map(stp => ({ name: stp.service.service })).map(stp => stp.name),
            province: property.location.department?.department,
            district: property.location.district?.district,
            departament: property.location.province?.province,
            images: property.images || null,
        }
    }


    private formatUrl(type, category, slugLocation, slugProperty, propertyId) {
        const base = '/es/inmueble/clasificado';
        const propetyType = propertyTypeMap[type]
        const propertyCategory = propertyCategoryMap[category]
        const shortId = propertyId.split('-')[0]
        return `${base}/${propetyType}-de-${propertyCategory}-en-${slugLocation}-${slugProperty}-${shortId}`
    }

}
