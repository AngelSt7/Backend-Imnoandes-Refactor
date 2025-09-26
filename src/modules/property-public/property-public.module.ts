import { CommonModule } from "@/common";
import { Module } from "@nestjs/common";
import { LocationModule } from "../location/location.module";
import { PropertyPublicController } from "./property-public.controller";
import { PropertyPublicService } from "./property-public.service";
import { PropertyRepository, PropertySelectsService } from "./repository";
import { PropertyService, CarrouselFilterService, PropertyFormatterService, SearchFilterService } from "./services";


@Module({
  imports: [
    CommonModule,
    LocationModule
  ],
  controllers: [
    PropertyPublicController
  ],
  providers: [
    PropertyPublicService,
    PropertyService,
    PropertyRepository,
    CarrouselFilterService,
    PropertySelectsService,
    PropertyFormatterService,
    SearchFilterService
  ],
})
export class PropertyPublicModule { }
