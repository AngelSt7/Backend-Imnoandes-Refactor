import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { QuerySearchLocationDto } from './dto/query-search-location.dto';
import { LocationRepository } from './respository/location.repository';
import { Department, Location, Province } from 'generated/prisma';
import { QuerySlugLocationDto } from './dto/query-slug-location.dto';

@Injectable()
export class LocationService {
    private logger = new Logger(LocationService.name)

    constructor(
        private readonly locationRepository: LocationRepository
    ) { }

    async getIdsLocations(dto: QuerySlugLocationDto) {
        const data = await this.locationRepository.getIdsLocations(dto);
        if (!data) throw new NotFoundException('Localizaciones no encontradas');

        const departmentsIds = [...new Set(data.map(d => d.departmentId ?? '').filter(Boolean))];
        const provinceIds    = [...new Set(data.map(d => d.provinceId ?? '').filter(Boolean))];
        const districtIds    = [...new Set(data.map(d => d.districtId ?? '').filter(Boolean))];

        return {
            departmentsIds,
            provinceIds,
            districtIds
        }
    }

    async findDistricts(provinceId: Province['id']) {
        const distritcs = await this.locationRepository.findDistricts(provinceId);
        if (!distritcs) throw new NotFoundException('Distritos no encontrados');
        return distritcs;
    }

    async findLocations(dto: QuerySlugLocationDto) {
        const locations = await this.locationRepository.findLocations(dto);

        const formatted = locations.map(l => {
            const parts = [
                l.district?.district,
                l.province?.province,
                l.department?.department
            ].filter(Boolean);
            return {
                slug: l.slug,
                label: parts.join(', ')
            }
        })

        if(locations.length !== dto.slugs.length) throw new NotFoundException('Localizaciones no encontradas');

        return formatted
    }


    async findProvinces(departmentId: Department['id']) {
        const provinces = await this.locationRepository.findProvinces(departmentId);
        if (!provinces) throw new NotFoundException('Provincias no encontradas');
        return provinces
    }

    async findLocation(departmentId: Location['departmentId'], provinceId: Location['provinceId'], districtId: Location['districtId']) {
        const location = await this.locationRepository.findLocation(departmentId, provinceId, districtId);
        if (!location) throw new NotFoundException('Localizaciones no encontradas');
        return location;
    }

    async search(query: QuerySearchLocationDto) {
        const q = query.search.toLowerCase();
        const search = await this.locationRepository.searchLocation(q);
        const formatted = search.map(l => {
            const parts = [
                l.district?.district,
                l.province?.province,
                l.department?.department
            ].filter(Boolean);

            return {
                slug: l.slug,
                label: parts.join(', ')
            };
        });

        return formatted;
    }
}

