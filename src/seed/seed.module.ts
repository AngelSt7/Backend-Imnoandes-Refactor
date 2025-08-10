import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommonModule } from 'src/common/common.module';
import { PropertyMeModule } from 'src/property-me';

@Module({
  imports: [
    CommonModule,
    PropertyMeModule
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule { }
