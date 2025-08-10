import { Injectable } from '@nestjs/common';
import { ServiceToProperty } from 'generated/prisma';
import { PrismaService } from 'src/common/services';

@Injectable()
export class ServiceService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    create(){

    }

    async delete(servicesId: ServiceToProperty['serviceId'][]) {
        await this.prisma.serviceToProperty.deleteMany({
            where: {
                serviceId: {
                    in: servicesId
                }
            }
        });        
    }

}
