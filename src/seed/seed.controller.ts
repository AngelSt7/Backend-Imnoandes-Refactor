import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Documentation } from '@decorators/doc/base/documentation.decorator';
import { ValidResponses } from 'src/auth/interfaces';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()
  @Documentation({summary: 'Execute the seed script', responses: [{ response: ValidResponses.create, description: 'Seed executed successfully.' }] })
  create(
  ) {
    return this.seedService.executeSeed();
  }
}
