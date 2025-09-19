import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { SERVICES_SEED } from './data/services-data.seed';
import { DEPARTMENT_SEED } from './data/departament-data.seed';
import { Department, Location, LOCATION, Property, Province } from 'generated/prisma';
import { PROVINCE_SEED } from './data/province-data.seed';
import { DISTRICT_SEED } from './data/district-data.seed';
import { PROPERTY_SEED, PropertySeed, PropertySeedExtended } from './data/property-data.seed';
import { CreatePropertyMeDto, PropertyService } from 'src/property-me';

interface LocationSlugs {
    slug: string;
    id: string
}[]

@Injectable()
export class SeedService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly propertyService: PropertyService
    ) { }

    async runSeed() {
        await this.deleteTables();
        await this.insertServices();

        return 'SEED EXECUTED SUCCESSFULLY';
    }

    async runSeedProperty() {
        await this.prisma.commercialProperty.deleteMany();
        await this.prisma.residentialProperty.deleteMany();
        await this.prisma.serviceToProperty.deleteMany();
        await this.prisma.property.deleteMany();

        const insertOne = PROPERTY_SEED.slice(0, 25)
        const insertTwo = PROPERTY_SEED.slice(25, 50)

        const idOne = "45ab0de0-8273-4963-ac3b-c7c895bcf557"
        const idTwo = "71c1d711-f155-410a-8214-46a9f39eb36a"

        const services = await this.getServices();

        const locations = await this.getLocations();

        const insertOnePromises = insertOne.map(inset => {
            const locationId = locations.find(l => l.slug === inset.slugPreview)?.id
            return this.propertyService.create(this.preparedProperties(services, inset), locationId!, idOne)
        })

        const insertTwoPromises = insertTwo.map(inset => {
            const locationId = locations.find(l => l.slug === inset.slugPreview)?.id
            return this.propertyService.create(this.preparedProperties(services, inset), locationId!, idTwo)
        })

        await Promise.all([
            ...insertOnePromises,
            ...insertTwoPromises

        ])

        return 'SEED TO PROPERTY EXECUTED SUCCESSFULLY';
    }

    getSlug(name: Property['name']) {
        return name.toLocaleLowerCase().trim().replace(/\s+/g, '-')
    }

    preparedProperties(
        services: { service: string; id: string; }[],
        property: PropertySeedExtended,
    ): CreatePropertyMeDto {

        const luz = services.find(service => service.service === 'Luz')?.id;
        const agua = services.find(service => service.service === 'Agua Potable')?.id;

        const fixed = [luz, agua].filter(Boolean);
        const exclude = services
            .filter(service => service.service !== 'Luz' && service.service !== 'Agua Potable')
            .map(service => service.id);

        if (property.propertyCategory === "LAND") return property

        const getRandomInt = (max: number) => Math.floor(Math.random() * max);

        const nRandom = getRandomInt(exclude.length) + 1;

        const usedIndexes = new Set<number>();
        const randomServices: string[] = [];

        while (randomServices.length < nRandom) {
            const randomIndex = getRandomInt(exclude.length);
            if (!usedIndexes.has(randomIndex)) {
                usedIndexes.add(randomIndex);
                randomServices.push(exclude[randomIndex]);
            }
        }

        const { slugPreview, ...rest } = property
        return {
            ...rest,
            servicesId: [...fixed, ...randomServices] as string[]
        };
    }


    async deleteTables() {
        await this.prisma.serviceToProperty.deleteMany()
        await this.prisma.service.deleteMany()
        await this.prisma.district.deleteMany()
        await this.prisma.province.deleteMany()
        await this.prisma.department.deleteMany()
    }

    async insertServices() {
        // crear servicios
        await this.prisma.service.createMany({ data: SERVICES_SEED });

        // crear departamentos
        await this.prisma.department.createMany({ data: DEPARTMENT_SEED });

        // recuperamos al data cuando creamos los departamentos
        const departments = await this.getDepartments();

        const provinces = await this.preparedProvinces(departments);


        await this.prisma.province.createMany({ data: provinces });
        // preparamos para crear provincias

        // recuperamos al data cuando creamos las provincias
        const provincesData = await this.getProvinces();

        const districts = await this.preparedDistricts(provincesData, departments);

        await this.prisma.district.createMany({ data: districts });

        const locations = await this.prueba();
        await this.prisma.location.createMany({ data: locations });
        return
    }


    async preparedDistricts(prov: Province[], dep: Department[]) {
        const districts = DISTRICT_SEED.map(dist => ({
            slug: dist.slug,
            provinceId: prov.find(p => this.normalizeText(p.province) == this.normalizeText(dist.province))?.id || '',
            departmentId: dep.find(depItem => this.normalizeText(depItem.department) == this.normalizeText(dist.department))?.id || '',
            district: dist.district
        }))
        return districts
    }


    normalizeText(text: string) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }

    async preparedProvinces(dep: Department[]) {
        const provinces = PROVINCE_SEED.map(p => ({
            province: p.province,
            departmentId: dep.find(d => d.department.toLocaleLowerCase() === p.department)?.id || '',
            slug: p.slug
        }))

        return provinces
    }

    async prueba() {
        const [department, province, district] = await Promise.all([
            this.prisma.department.findMany({ select: { slug: true, id: true } }),
            this.prisma.province.findMany({ select: { slug: true, id: true, departmentId: true } }),
            this.prisma.district.findMany({ select: { slug: true, id: true, provinceId: true, departmentId: true } }),
        ])

        const formatDepartment = department.map(dep => ({
            slug: String(dep.slug),
            departmentId: dep.id,
            type: LOCATION['DEPARTMENT']
        }))
        const formatProvince = province.map(dep => ({
            departmentId: dep.departmentId,
            provinceId: dep.id,
            slug: dep.slug,
            type: LOCATION['PROVINCE']
        }))
        const formatDistrict = district.map(dep => ({
            departmentId: dep.departmentId,
            provinceId: dep.provinceId,
            districtId: dep.id,
            slug: dep.slug,
            type: LOCATION['DISTRICT']
        }))

        return [...formatDepartment, ...formatProvince, ...formatDistrict]
    }

    async getProvinces() {
        return await this.prisma.province.findMany();
    }

    async getDepartments() {
        return await this.prisma.department.findMany();
    }

    async getServices() {
        return await this.prisma.service.findMany({ select: { id: true, service: true } });
    }

    async getLocations() {
        return await this.prisma.location.findMany({ select: { slug: true, id: true } });
    }
}
