import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PropertyMeModule } from '@/modules';
import { CommonModule } from '@/common';

@Module({
  imports: [
    CommonModule,
    PropertyMeModule
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule { }
