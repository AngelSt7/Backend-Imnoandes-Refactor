import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/services';
import { Image, IMAGE_TYPE, Prisma, Property } from 'generated/prisma';
import { CreateImagePropertyMeDto, CreateImagesPropertyMeDto } from '@/modules/property-me/dto';

@Injectable()
export class ImagesPropertyRepository {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async images(
        id: Property['id'],
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.image.findMany({ where: { propertyId: id }, select: { url: true, type: true, id: true } });
    }

    async delete(
        data: Image['url'][],
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.image.deleteMany({
            where: { url: { in: data } }
        });
    }

    async createMain(
        data: CreateImagePropertyMeDto,
        type: IMAGE_TYPE,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        return await prismaClient.image.upsert({
            where: {
                id: data.id ?? '',
            },
            create: {
                propertyId: data.propertyId,
                publicId: data.publicId,
                url: data.url,
                type: type
            },
            update: {
                url: data.url,
                publicId: data.publicId,
            }
        });
    }

    async createGallery(
        data: CreateImagesPropertyMeDto,
        prismaClient: PrismaService | Prisma.TransactionClient = this.prisma
    ) {
        const createdImages : Image[] = []
        for (const image of data.images) {
            const created = await prismaClient.image.create({
                data: {
                    propertyId: data.propertyId,
                    url: image.url,
                    publicId: image.publicId,
                    type: IMAGE_TYPE.GALLERY
                }
            })
            createdImages.push(created);
        }
        return createdImages;
    }
}
