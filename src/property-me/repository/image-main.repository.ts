import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { Prisma } from '../../../generated/prisma/index';
import { CreateImageMainPropertyMeDto } from '../dto/request/create-image-main-property-me.dto';

@Injectable()
export class ImageMainRepository {

    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async createImageMain(
        imageMain: CreateImageMainPropertyMeDto,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
        ) {
        return await prismaClient.imageMain.create({
            data: {
                id: imageMain.id,
                url: imageMain.url
            }
        });
    }
}
