import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { DistrictService } from './district.service';
import { Province } from 'generated/prisma';
import { Cached } from '@decorators/cache/cached.decorator';
import { CACHE_KEYS } from 'src/cache/cache-keys';
import { DISTRICT_SEED } from 'src/seed/data/district-data.seed';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) { }

  @Get()
  get() {
    return DISTRICT_SEED.map(d => (
      {
        ...d,
        slug: `${d.slug}-${d.province}--${d.department}`
      }))
  }

  @Get('/:provinceId')
  @Cached(CACHE_KEYS.DISTRICTS_TO_PROVINCE)
  async findAll(
    @Param('provinceId', ParseUUIDPipe) provinceId: Province['id']
  ) {
    return this.districtService.findAll(provinceId);
  }
}
