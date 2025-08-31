import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { CloudinaryService } from './services/cloudinary.service';
import { ValidationsService } from './services/validations/validations.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, CloudinaryService, ValidationsService, ],
})
export class ImagesModule {}
