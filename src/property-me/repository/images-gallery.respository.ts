import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ImagesGalleryRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async createImagesGallery(
        data: Prisma.ImagesGalleryCreateManyInput[],
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.imagesGallery.createMany({ data });
    }
}
