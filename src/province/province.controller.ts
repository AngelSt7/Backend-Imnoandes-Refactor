import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { Department } from 'generated/prisma';
import { Cached } from '@decorators/cache/cached.decorator';
import { CACHE_KEYS } from 'src/cache/cache-keys';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get(':departmentId')
  @Cached(CACHE_KEYS.PROVINCES_TO_DEPARTMENT)
  async findAll(
    @Param('departmentId', ParseUUIDPipe) departmentId: Department['id']
  ) {
    return await this.provinceService.findAll(departmentId);
  }
}
