import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('/prueba')
  pruebas(){
    return this.seedService.prueba();
  }

  @Get()
  executeSeed() {
    return this.seedService.runSeed();
  }

  @Get('/property')
  executeSeedProperty() {
    return this.seedService.runSeedProperty();
  }
}
