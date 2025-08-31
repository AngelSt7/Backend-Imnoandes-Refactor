import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth';
import { PropertyService, PropertyRepository, PropertyMeController, PropertyMeService, ServiceToPropertyService, PropertyFactoryService, FilterService, ServiceToPropertyUtilsService, PropertyFormatterService, TransactionService, ServiceToPropertyRepository  } from '.';
import { ImageMainRepository } from './repository/image-main.repository';
import { ImagesGalleryRepository } from './repository/images-gallery.respository';
import { ImageMainService } from './services/domain/image-main.service';
import { ImagesGalleryService } from './services/domain/images-gallery.service';

@Module({
  imports: [
    CommonModule,
    AuthModule
  ],
  controllers: [
    PropertyMeController
  ],
  providers: [
    PropertyMeService,
    PropertyService,
    PropertyRepository,
    PropertyFactoryService,
    PropertyFormatterService,
    FilterService,
    ServiceToPropertyUtilsService,
    ServiceToPropertyService,
    TransactionService,
    ServiceToPropertyRepository,
    ImageMainRepository,
    ImagesGalleryRepository,
    ImageMainService,
    ImagesGalleryService
  ],
  exports: [
    PropertyService
  ]
})
export class PropertyMeModule {}
