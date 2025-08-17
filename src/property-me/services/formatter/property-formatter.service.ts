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
            property_type: property.property_type,
            property_category: property.property_category,
            availability: property.availability,
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
            property_type: property.property_type,
            currency: property.currency,
            property_category: property.property_category,
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
            property_type: property.property_type,
            currency: property.currency,
            property_category: property.property_category,
            price: property.price,
            yearBuilt: property.yearBuilt,
            latitude: property.latitude,
            longitude: property.longitude,
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
            mainImage: property.mainImage?.url || null,
            imagesGallery: property.imagesGallery.map(img => img.url)
        }
    }
}
