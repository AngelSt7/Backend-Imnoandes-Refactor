import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/services';
import { SERVICES_SEED } from './data/services-data.seed';
import { DEPARTMENT_SEED } from './data/departament-data.seed';
import { PROVINCE_SEED } from './data/province-data.seed';
import { DISTRICT_SEED } from './data/district-data.seed';
import { PROPERTY_SEED, PropertySeed } from './data/property-data.seed';
import { Department, Province, LOCATION, Property, AUTH_PROVIDERS } from 'generated/prisma';
import { PropertyService } from '@/modules/property-me/services';
import { CreatePropertyMeDto } from '@/modules/property-me/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly propertyService: PropertyService,
    ) { }

    async runSeed() {
        await this.resetDatabase();
        await this.seedUsers();
        await this.seedBaseData();
        await this.seedProperties();
        return 'SEED EXECUTED SUCCESSFULLY';
    }

    private async resetDatabase() {
        await Promise.all([
            this.prisma.token.deleteMany(),
            this.prisma.serviceToProperty.deleteMany(),
            this.prisma.service.deleteMany(),
        ])
        await this.prisma.district.deleteMany();
        await this.prisma.province.deleteMany();
        await this.prisma.department.deleteMany();
        await Promise.all([
            this.prisma.favorite.deleteMany(),
            this.prisma.commercialProperty.deleteMany(),
            this.prisma.residentialProperty.deleteMany(),
            this.prisma.serviceToProperty.deleteMany(),
            this.prisma.image.deleteMany(),
        ])
        await this.prisma.property.deleteMany()
        await this.prisma.location.deleteMany(),
            await this.prisma.user.deleteMany()
    }

    private async seedUsers() {
        const [passwordUser1, passwordUser2] = await Promise.all([
            bcrypt.hash("Lapiz123*@", 10),
            bcrypt.hash("Lapiz123*@", 10)
        ])
        const users = [
            { name: "Angel", lastname: "Santa Cruz", email: "santacruza2000@gmail.com", authProvider: AUTH_PROVIDERS.LOCAL, confirmed: true, birthDate: new Date("2004-08-23"), phone: "960856003", password: passwordUser1 },
            { name: "Mildredth", lastname: "Rojas Villarroel", email: "xrojasvillarroel@gmail.com", authProvider: AUTH_PROVIDERS.LOCAL, confirmed: true, birthDate: new Date("2001-07-14"), phone: "952124293", password: passwordUser2 },
        ]
        return await this.prisma.user.createMany({ data: users });
    }

    private async seedBaseData() {
        // Servicios
        await this.prisma.service.createMany({ data: SERVICES_SEED });

        // Departamentos
        await this.prisma.department.createMany({ data: DEPARTMENT_SEED });
        const departments = await this.findDepartments();

        // Provincias
        const provinces = this.mapProvinces(departments);
        await this.prisma.province.createMany({ data: provinces });

        // Distritos
        const provincesData = await this.findProvinces();
        const districts = await this.preparedDistricts(provincesData, departments);
        await this.prisma.district.createMany({ data: districts });

        // Ubicaciones
        const locations = await this.mapLocations();
        await this.prisma.location.createMany({ data: locations });
    }

    async seedProperties() {
        const insertOne = PROPERTY_SEED.slice(0, 25);
        const insertTwo = PROPERTY_SEED.slice(25, 50);

        const users = await this.getUsers();

        const idOne = users[0].id;
        const idTwo = users[1].id;

        const services = await this.findServices();
        const locations = await this.findLocations();

        const insertOnePromises = insertOne.map(prop => {
            const locationId = locations.find(l => l.slug === prop.slugLocation)?.id;
            return this.propertyService.create(this.mapPropertyWithServices(services, prop), locationId!, idOne);
        });

        const insertTwoPromises = insertTwo.map(prop => {
            const locationId = locations.find(l => l.slug === prop.slugLocation)?.id;
            return this.propertyService.create(this.mapPropertyWithServices(services, prop), locationId!, idTwo);
        });

        await Promise.all([...insertOnePromises, ...insertTwoPromises]);

        return 'SEED TO PROPERTY EXECUTED SUCCESSFULLY';
    }

    private mapPropertyWithServices(
        services: { service: string; id: string }[],
        property: PropertySeed
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

        const { slugLocation, ...rest } = property;
        return { ...rest, servicesId: [...fixed, ...randomServices] as string[] };
    }

    getSlug(name: Property['name']) {
        return name.toLocaleLowerCase().trim().replace(/\s+/g, '-');
    }

    private normalizeText(text: string) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    private mapProvinces(dep: Department[]) {
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

    private async mapLocations() {
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

    private async findProvinces() {
        return this.prisma.province.findMany();
    }

    private async findDepartments() {
        return this.prisma.department.findMany();
    }

    private async findServices() {
        return this.prisma.service.findMany({ select: { id: true, service: true } });
    }

    async findLocations() {
        return await this.prisma.location.findMany({
            select: { slug: true, id: true },
            where: { slug: { in: [
                        "miraflores-lima-lima",
                        "chorrillos-lima-lima",
                        "la-molina-lima-lima",
                        "santiago-de-surco-lima-lima",
                        "magdalena-del-mar-lima-lima"
                    ] }
            }
        });
    }

    async getUsers() {
        return await this.prisma.user.findMany({ select: { id: true } });
    }

}
