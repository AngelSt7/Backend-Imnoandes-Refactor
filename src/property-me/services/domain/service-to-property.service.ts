import { Injectable } from '@nestjs/common';
import { Prisma, ServiceToProperty } from 'generated/prisma';
import { PrismaService } from 'src/common/services';
import { ServiceToPropertyRepository } from 'src/property-me/repository';

@Injectable()
export class ServiceToPropertyService {

    constructor(
        private readonly serviceToPropertyRepository: ServiceToPropertyRepository
    ) { }

    async delete(
            servicesId: ServiceToProperty['serviceId'][],
            prismaClient: Prisma.TransactionClient
        ) {
        await this.serviceToPropertyRepository.delete(servicesId, prismaClient);      
    }

}
