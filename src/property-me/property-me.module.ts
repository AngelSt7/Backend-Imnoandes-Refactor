import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth';
import { PropertyService, PropertyRepository, PropertyMeController, PropertyMeService, ServiceService, PropertyFactoryService } from '.';
import { FilterService } from './services/filter';
import { PropertyFormatterService } from './services/formatter';
import { PropertyUtilsService } from './services/utils/property-utils.service';



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
    PropertyUtilsService,
    ServiceService
  ],
  exports: [
    PropertyService
  ]
})
export class PropertyMeModule {}
