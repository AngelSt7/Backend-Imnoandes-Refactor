import { AllPropertiesBD, FormattedAllProperty, FormattedDetailProperty, PropertyFormatted, OnePropertyDB } from 'src/property-me/interfaces';
import { Injectable } from '@nestjs/common';
import { DetailPropertyBD } from 'src/property-me/interfaces';

@Injectable()
export class PropertyFormatterService {

    formatAll(properties: AllPropertiesBD[]) : FormattedAllProperty[]{
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
            location: `${property.district.district}, ${property.province.province}`
        }))
    }

    formatOne(property: OnePropertyDB) : PropertyFormatted {
        return {
            id: property.id,
            name: property.name,
            propertyType: property.propertyType,
            currency: property.currency,
            propertyCategory: property.propertyCategory,
            price: property.price,
            yearBuilt: property.yearBuilt,
            latitude: property.latitude,
            longitude: property.longitude,
            hasTerrace: property.residential?.hasTerrace,
            location: property.location,
            description: property.description,
            availability: property.availability,
            districtId: property.districtId,
            departmentId: property.departmentId,
            provinceId: property.provinceId,
            phone: property.phone,
            floor: property.commercial?.floor,
            hasParking: property.commercial?.hasParking,
            parkingSpaces: property.commercial?.parkingSpaces,
            bedrooms: property.residential?.bedrooms,
            bathrooms: property.residential?.bathrooms,
            area: property.residential?.area,
            furnished: property.residential?.furnished,
            servicesId: property.serviceToProperty.map(stp => ({ id: stp.service.id })).map(stp => stp.id)
        }
    }

    formatDetail( property: DetailPropertyBD ) : FormattedDetailProperty {
        return {
            id: property.id,
            name: property.name,
            propertyType: property.propertyType,
            currency: property.currency,
            propertyCategory: property.propertyCategory,
            price: property.price,
            yearBuilt: property.yearBuilt,
            hasTerrace: property.residential?.hasTerrace,
            location: property.location,
            description: property.description,
            availability: property.availability,
            floor: property.commercial?.floor,
            hasParking: property.commercial?.hasParking,
            parkingSpaces: property.commercial?.parkingSpaces,
            bedrooms: property.residential?.bedrooms,
            bathrooms: property.residential?.bathrooms,
            area: property.residential?.area,
            furnished: property.residential?.furnished,
            services: property.serviceToProperty.map(stp => ({ name: stp.service.service})).map(stp => stp.name),
            province: property.province.province,
            district: property.district.district,
            departament: property.department.department,
            images: property.images || null,
        }
    }
}
