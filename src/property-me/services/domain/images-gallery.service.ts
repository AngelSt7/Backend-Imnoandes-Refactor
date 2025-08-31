import { Injectable } from '@nestjs/common';
import { CreateImagesGalleryPropertyMeDto } from 'src/property-me/dto/request/create-images-gallery-property-me.dto';
import { ImagesGalleryRepository } from 'src/property-me/repository';

@Injectable()
export class ImagesGalleryService {

    constructor(
        private readonly imagesGalleryRepository: ImagesGalleryRepository
    ) { }

    async createImagesGallery(dto: CreateImagesGalleryPropertyMeDto) {
        const preparedCreateMany = dto.url.map(url => ({ url, propertyId: dto.id }));
        return await this.imagesGalleryRepository.createImagesGallery(preparedCreateMany);
    }

}
