import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { SERVICES_SEED } from './data/services-data.seed';
import { DEPARTAMENT_SEED } from './data/departament-data.seed';
import { Departament, Property, Province } from 'generated/prisma';
import { PROVINCE_SEED } from './data/province-data.seed';
import { DISTRICT_SEED } from './data/district-data.seed';
import { PROPERTY_SEED } from './data/property-data.seed';
import { PropertyService } from 'src/property-me';

interface PreparedProvince {

    province: string;
    departamentId: string;
    slug: string;

}

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

        const idOne = "76962696-dc44-427e-882d-d1da0c28c333"
        const idTwo = "80cdee91-1afb-45a8-a354-c7882c5a38ee"

        const insertOnePromises = insertOne.map(inset => (
            this.propertyService.create(inset, this.getSlug(inset.name), idOne)
        ))

        const insertTwoPromises = insertTwo.map(inset => (
            this.propertyService.create(inset, this.getSlug(inset.name), idTwo)
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



    async deleteTables() {
        await this.prisma.service.deleteMany()
        await this.prisma.district.deleteMany()
        await this.prisma.province.deleteMany()
        await this.prisma.departament.deleteMany()
    }

    async insertServices() {
        // crear servicios
        await this.prisma.service.createMany({ data: SERVICES_SEED });

        // crear departamentos
        await this.prisma.departament.createMany({ data: DEPARTAMENT_SEED });

        // recuperamos al data cuando creamos los departamentos
        const departaments = await this.getDepartaments();

        const provinces = await this.preparedProvinces(departaments);


        await this.prisma.province.createMany({ data: provinces });
        // preparamos para crear provincias

        // recuperamos al data cuando creamos las provincias
        const provincesData = await this.getProvinces();

        const districts = await this.preparedDistricts(provincesData, departaments);

        await this.prisma.district.createMany({ data: districts });
        return
    }


    async preparedDistricts(prov: Province[], dep: Departament[]) {
        const districts = DISTRICT_SEED.map(dist => ({
            slug: dist.slug,
            provinceId: prov.find(p => this.normalizeText(p.province) == this.normalizeText(dist.province))?.id || '',
            departamentId: dep.find(depItem => this.normalizeText(depItem.departament) == this.normalizeText(dist.departament))?.id || '',
            district: dist.district
        }))
        return districts
    }


    normalizeText(text: string) {
        return text
            .normalize("NFD") // separa las letras de los acentos
            .replace(/[\u0300-\u036f]/g, '') // quita los acentos
            .toLowerCase();
    }

    async preparedProvinces(dep: Departament[]) {
        const provinces = PROVINCE_SEED.map(p => ({
            province: p.province,
            departamentId: dep.find(d => d.departament.toLocaleLowerCase() === p.departament)?.id || '',
            slug: p.slug
        }))

        return provinces
    }




    async getProvinces() {
        return await this.prisma.province.findMany();
    }

    async getDepartaments() {
        return await this.prisma.departament.findMany();
    }
}
