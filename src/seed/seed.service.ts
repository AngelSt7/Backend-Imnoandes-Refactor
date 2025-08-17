import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { SERVICES_SEED } from './data/services-data.seed';
import { DEPARTMENT_SEED } from './data/departament-data.seed';
import { Department, Property, Province } from 'generated/prisma';
import { PROVINCE_SEED } from './data/province-data.seed';
import { DISTRICT_SEED } from './data/district-data.seed';
import { PROPERTY_SEED, PropertySeed } from './data/property-data.seed';
import { CreatePropertyMeDto, PropertyService } from 'src/property-me';

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

        const idOne = "4737c061-6d19-4f0d-b7f1-7b03ffbecbc7"
        const idTwo = "399af104-1076-4833-a232-ae2670a31ad0"

        const services = await this.getServices();

        const insertOnePromises = insertOne.map(inset => (
            this.propertyService.create(this.preparedProperties(services, inset), idOne)
        ))

        const insertTwoPromises = insertTwo.map(inset => (
            this.propertyService.create(this.preparedProperties(services, inset), idTwo)
        ))

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
        property: PropertySeed
    ): CreatePropertyMeDto {

        const luz = services.find(service => service.service === 'Luz')?.id;
        const agua = services.find(service => service.service === 'Agua Potable')?.id;

        const fixed = [luz, agua].filter(Boolean);
        const exclude = services
            .filter(service => service.service !== 'Luz' && service.service !== 'Agua Potable')
            .map(service => service.id);
        
        if (property.property_category === "LAND") {
            return {
                ...property,
                servicesId: fixed as string[]
            };
        }
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

        return {
            ...property,
            servicesId: [...fixed, ...randomServices] as string[]
        };
    }


    async deleteTables() {
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

    async getProvinces() {
        return await this.prisma.province.findMany();
    }

    async getDepartments() {
        return await this.prisma.department.findMany();
    }

    async getServices() {
        return await this.prisma.service.findMany({ select: { id: true, service: true } });
    }
}
