import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoritesController } from './favorite.controller';
import { AuthModule } from '../auth';
import { FavoriteRepository } from './repository';
import { CommonModule } from '@/common';
import { PropertyPublicModule } from '../property-public';

@Module({
  imports: [AuthModule, CommonModule, PropertyPublicModule],
  controllers: [FavoritesController],
  providers: [FavoriteService, FavoriteRepository],
})
export class FavoriteModule {}
