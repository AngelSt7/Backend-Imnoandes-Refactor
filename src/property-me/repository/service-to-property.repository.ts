import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { Prisma, Property, ServiceToProperty, User } from 'generated/prisma';

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
