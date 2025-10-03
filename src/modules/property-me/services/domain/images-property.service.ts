import { Injectable } from '@nestjs/common';
import { Image, IMAGE_TYPE, Property } from 'generated/prisma';
import { CreateImagePropertyMeDto, CreateImagesPropertyMeDto } from '@/modules/property-me/dto';
import { ImagesPropertyRepository } from '@/modules/property-me/repository';

@Injectable()
export class ImagesPropertyService {

    constructor(
        private readonly imagesPropertyRepository: ImagesPropertyRepository
    ) { }

    async images(id: Property['id']) {
        return await this.imagesPropertyRepository.images(id);
    }

    async deleteImages(urls: Image['url'][]) {
        return await this.imagesPropertyRepository.delete(urls);
    }

    async createMain(dto: CreateImagePropertyMeDto) {
        return await this.imagesPropertyRepository.createMain(dto, IMAGE_TYPE.MAIN);
    }

    async createGallery(dto: CreateImagesPropertyMeDto) {
        return await this.imagesPropertyRepository.createGallery(dto);
    }

}
