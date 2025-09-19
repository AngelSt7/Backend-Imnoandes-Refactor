import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationRepository } from './respository/location.repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [LocationController],
  providers: [LocationService, LocationRepository],
  exports: [LocationService]
})
export class LocationModule {}
