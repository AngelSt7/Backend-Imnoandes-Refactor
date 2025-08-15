import { Module } from '@nestjs/common';
import { ProvinceController, ProvinceRepository, ProvinceService } from '.';
import { CommonModule } from 'src/common/common.module';
@Module({
  imports : [CommonModule],
  controllers: [ProvinceController],
  providers: [ProvinceService, ProvinceRepository],
})
export class ProvinceModule {}
