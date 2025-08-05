import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { CloudinaryService } from './services/cloudinary.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, CloudinaryService],
})
export class ImagesModule {}
