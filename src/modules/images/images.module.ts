import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { CloudinaryService, ValidationsService } from './services';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, CloudinaryService, ValidationsService, ],
  exports: [ImagesService, CloudinaryService]
})
export class ImagesModule {}
