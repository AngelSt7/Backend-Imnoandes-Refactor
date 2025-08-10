import { AllPropertiesBD, OnePropertyDB } from 'src/property-me/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyFormatterService {

    // departament: DepartamentInfo,
    // province: ProvinceInfo,
    // district: DistrictInfo
    formatAll(properties: AllPropertiesBD[]) {
        return properties.map(property => ({
            id: property.id,
            name: property.name,
            price: property.price,
            currency: property.currency,
            property_type: property.property_type,
            property_category: property.property_category,
            availability: property.availability,
            area: property.residential?.area,
            bathrooms: property.residential?.bathrooms,
            bedrooms: property.residential?.bedrooms,
            location: `${property.district.district}, ${property.province.province}`
        }))
    }

    formatOne(property: OnePropertyDB) {
        return {
            id: property.id,
            name: property.name,
            property_type: property.property_type,
            currency: property.currency,
            property_category: property.property_category,
            price: property.price,
            location: property.location,
            description: property.description,
            availability: property.availability,
            userId: property.userId,
            districtId: property.districtId,
            departmentId: property.departmentId,
            provinceId: property.provinceId,
            floor: property.commercial?.floor,
            parkingSpaces: property.commercial?.parkingSpaces,
            bedrooms: property.residential?.bedrooms,
            bathrooms: property.residential?.bathrooms,
            area: property.residential?.area,
            furnished: property.residential?.furnished,
            servicesId: property.serviceToProperty.map(stp => ({
                id: stp.service.id,
                name: stp.service.service,
            })),
        }
    }
}
