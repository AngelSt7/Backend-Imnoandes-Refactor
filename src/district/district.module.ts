import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { DistrictRepository } from './repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [DistrictController],
  providers: [DistrictService, DistrictRepository],
})
export class DistrictModule {}
