import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { PropertyService, ServiceToPropertyService } from '../domain';
import { Property, ServiceToProperty } from 'generated/prisma';
import { UpdatePropertyMeDto } from 'src/property-me/dto';

@Injectable()
export class TransactionService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly serviceToProperty: ServiceToPropertyService,
        private readonly propertyService: PropertyService
    ){}

    async update(
        deletes: ServiceToProperty['serviceId'][],
        updatePropertyMeDto: UpdatePropertyMeDto,
        id: Property['id'], 
    ){
        return await this.prisma.$transaction(async (prisma) => {
            await this.serviceToProperty.delete(deletes, prisma)
            await this.propertyService.update(id, updatePropertyMeDto, prisma);
        });
    }
}
