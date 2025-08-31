import { Injectable } from '@nestjs/common';
import { CreateImageMainPropertyMeDto } from 'src/property-me/dto/request/create-image-main-property-me.dto';
import { ImageMainRepository } from 'src/property-me/repository';

@Injectable()
export class ImageMainService {

    constructor(
        private readonly imageMainRepository: ImageMainRepository
    ) { }
    
    async createImageMain(dto: CreateImageMainPropertyMeDto) {
        return await this.imageMainRepository.createImageMain(dto);
    }
}
