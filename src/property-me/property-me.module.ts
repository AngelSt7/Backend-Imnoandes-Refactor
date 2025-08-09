import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth';
import { PropertyService, PropertyRepository, PropertyMeController, PropertyMeService } from '.';


@Module({
  imports: [
    CommonModule,
    AuthModule
  ],
  controllers: [
    PropertyMeController
  ],
  providers: [
    PropertyMeService,
    PropertyService,
    PropertyRepository
  ],
})
export class PropertyMeModule {}
