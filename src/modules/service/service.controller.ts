import { Controller, Get } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Cached } from '@/common/decorators';
import { CACHE_KEYS } from '@/cache/cache-keys';
import { TTL } from '@/cache/ttls';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @Cached(CACHE_KEYS.SERVICE, TTL.ONE_WEEK)
  async findAll() {
    return await this.serviceService.findAll();
  }
}
