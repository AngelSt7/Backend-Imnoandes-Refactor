import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/services';
import { SERVICES_SEED } from './data/services-data.seed';
import { DEPARTMENT_SEED } from './data/departament-data.seed';
import { PROVINCE_SEED } from './data/province-data.seed';
import { DISTRICT_SEED } from './data/district-data.seed';
import { PROPERTY_SEED, PropertySeedExtended } from './data/property-data.seed';
import { Department, Province, LOCATION, Property } from 'generated/prisma';
import { PropertyService } from '@/modules/property-me/services';
import { CreatePropertyMeDto } from '@/modules/property-me/dto';

@Injectable()
export class SeedService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly propertyService: PropertyService
    ) {}

    // -----------------------------
    // ENTRY POINTS
    // -----------------------------
    async runSeed() {
        await this.deleteTables();
        await this.insertServices();
        return 'SEED EXECUTED SUCCESSFULLY';
    }

    async runSeedProperty() {
        await this.clearProperties();

        const insertOne = PROPERTY_SEED.slice(0, 25);
        const insertTwo = PROPERTY_SEED.slice(25, 50);

        const idOne = "45ab0de0-8273-4963-ac3b-c7c895bcf557";
        const idTwo = "71c1d711-f155-410a-8214-46a9f39eb36a";

        const services = await this.getServices();
        const locations = await this.getLocations();

        const insertOnePromises = insertOne.map(prop => {
            const locationId = locations.find(l => l.slug === prop.slugPreview)?.id;
            return this.propertyService.create(this.preparedProperties(services, prop), locationId!, idOne);
        });

        const insertTwoPromises = insertTwo.map(prop => {
            const locationId = locations.find(l => l.slug === prop.slugPreview)?.id;
            return this.propertyService.create(this.preparedProperties(services, prop), locationId!, idTwo);
        });

        await Promise.all([...insertOnePromises, ...insertTwoPromises]);

        return 'SEED TO PROPERTY EXECUTED SUCCESSFULLY';
    }

    // -----------------------------
    // TABLE CLEANUP
    // -----------------------------
    private async deleteTables() {
        await this.prisma.serviceToProperty.deleteMany();
        await this.prisma.service.deleteMany();
        await this.prisma.district.deleteMany();
        await this.prisma.province.deleteMany();
        await this.prisma.department.deleteMany();
    }

    private async clearProperties() {
        await this.prisma.commercialProperty.deleteMany();
        await this.prisma.residentialProperty.deleteMany();
        await this.prisma.serviceToProperty.deleteMany();
        await this.prisma.property.deleteMany();
    }

    // -----------------------------
    // DATA INSERTION
    // -----------------------------
    private async insertServices() {
        // Servicios
        await this.prisma.service.createMany({ data: SERVICES_SEED });

        // Departamentos
        await this.prisma.department.createMany({ data: DEPARTMENT_SEED });
        const departments = await this.getDepartments();

        // Provincias
        const provinces = this.preparedProvinces(departments);
        await this.prisma.province.createMany({ data: provinces });

        // Distritos
        const provincesData = await this.getProvinces();
        const districts = await this.preparedDistricts(provincesData, departments);
        await this.prisma.district.createMany({ data: districts });

        // Ubicaciones
        const locations = await this.prepareLocations();
        await this.prisma.location.createMany({ data: locations });
    }

    // -----------------------------
    // PROPERTY PREPARATION
    // -----------------------------
    private preparedProperties(
        services: { service: string; id: string }[],
        property: PropertySeedExtended
    ): CreatePropertyMeDto {
        const luz = services.find(s => s.service === 'Luz')?.id;
        const agua = services.find(s => s.service === 'Agua Potable')?.id;
        const fixed = [luz, agua].filter(Boolean);

        const exclude = services
            .filter(s => s.service !== 'Luz' && s.service !== 'Agua Potable')
            .map(s => s.id);

        if (property.propertyCategory === "LAND") return property;

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

        const { slugPreview, ...rest } = property;
        return { ...rest, servicesId: [...fixed, ...randomServices] as string[] };
    }

    getSlug(name: Property['name']) {
        return name.toLocaleLowerCase().trim().replace(/\s+/g, '-');
    }

    // -----------------------------
    // DEPARTMENTS / PROVINCES / DISTRICTS
    // -----------------------------
    private normalizeText(text: string) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    private preparedProvinces(dep: Department[]) {
        return PROVINCE_SEED.map(p => ({
            province: p.province,
            departmentId: dep.find(d => d.department.toLocaleLowerCase() === p.department)?.id || '',
            slug: p.slug
        }));
    }

    private async preparedDistricts(prov: Province[], dep: Department[]) {
        return DISTRICT_SEED.map(dist => ({
            slug: dist.slug,
            provinceId: prov.find(p => this.normalizeText(p.province) === this.normalizeText(dist.province))?.id || '',
            departmentId: dep.find(d => this.normalizeText(d.department) === this.normalizeText(dist.department))?.id || '',
            district: dist.district
        }));
    }

    // -----------------------------
    // LOCATIONS
    // -----------------------------
    private async prepareLocations() {
        const [departments, provinces, districts] = await Promise.all([
            this.prisma.department.findMany({ select: { slug: true, id: true } }),
            this.prisma.province.findMany({ select: { slug: true, id: true, departmentId: true } }),
            this.prisma.district.findMany({ select: { slug: true, id: true, provinceId: true, departmentId: true } }),
        ]);

        const formatDepartment = departments.map(dep => ({
            slug: String(dep.slug),
            departmentId: dep.id,
            type: LOCATION['DEPARTMENT']
        }));
        const formatProvince = provinces.map(p => ({
            departmentId: p.departmentId,
            provinceId: p.id,
            slug: p.slug,
            type: LOCATION['PROVINCE']
        }));
        const formatDistrict = districts.map(d => ({
            departmentId: d.departmentId,
            provinceId: d.provinceId,
            districtId: d.id,
            slug: d.slug,
            type: LOCATION['DISTRICT']
        }));

        return [...formatDepartment, ...formatProvince, ...formatDistrict];
    }

    // -----------------------------
    // HELPERS TO FETCH FROM DB
    // -----------------------------
    private async getProvinces() {
        return this.prisma.province.findMany();
    }

    private async getDepartments() {
        return this.prisma.department.findMany();
    }

    private async getServices() {
        return this.prisma.service.findMany({ select: { id: true, service: true } });
    }

    private async getLocations() {
        return this.prisma.location.findMany({ select: { slug: true, id: true } });
    }
}
