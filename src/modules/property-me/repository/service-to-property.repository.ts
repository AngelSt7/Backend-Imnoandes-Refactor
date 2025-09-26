import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/services';
import { Prisma, ServiceToProperty } from 'generated/prisma';

@Injectable()
export class ServiceToPropertyRepository {
    private logger = new Logger(ServiceToPropertyRepository.name)
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async delete(
        servicesId: ServiceToProperty['serviceId'][], 
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        await prismaClient.serviceToProperty.deleteMany({
            where: {
                serviceId: {
                    in: servicesId
                }
            }
        });
    }

}
