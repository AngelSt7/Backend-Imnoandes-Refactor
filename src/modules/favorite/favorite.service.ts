import { Injectable, NotFoundException } from '@nestjs/common';
import { Property, User } from 'generated/prisma';
import { FavoriteRepository } from './repository';
import { CreateFavoriteDto, QueryPaginationDto } from './dto';
import { PropertySelectsService } from '../property-public/repository';
import { CacheUtilsService } from '@/common/services';
import { CACHE_KEYS } from '@/cache/cache-keys';
import { PropertyFormatterService } from '../property-public/services';

@Injectable()
export class FavoriteService {

  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly propertySelectsService: PropertySelectsService,
    private readonly cacheUtilsService: CacheUtilsService,
    private readonly propertyFormatterService: PropertyFormatterService
  ) {}

  async create(userId : User['id'], dto: CreateFavoriteDto) {
    const property = await this.favoriteRepository.findProperty(dto.propertyId);
    if(!property) throw new NotFoundException('Propiedad no encontrada');
    await this.favoriteRepository.addFavorite(dto.propertyId, userId);
    await this.cacheUtilsService.deleteKeys([`${CACHE_KEYS.PROPERTY_FAVORITES}/${userId}`, `${CACHE_KEYS.PROPERTY_FAVORITES_IDS}/${userId}`]);
    return {
      message: 'Propiedad favorita agregada correctamente',
    }
  }

  async getFavoritesIds(userId: User['id']) {
    const ids = await this.favoriteRepository.getFavoritesIds(userId);
    return ids.map((id) => id.propertyId);
  }

  async findAll(userId: User['id'],query: QueryPaginationDto) {
    const filters = this.propertySelectsService.preparedSearch()
    const properties = await this.favoriteRepository.listFavorites(userId, filters, query.page);
    const formatter = this.propertyFormatterService.formatSearch(properties.data);
    return {
      data: formatter,
      meta: properties.meta
    }
  }

  async remove(userId: User['id'], propertyId: Property['id']) {
    await this.favoriteRepository.remove(userId, propertyId);
    await this.cacheUtilsService.deleteKeys([`${CACHE_KEYS.PROPERTY_FAVORITES}/${userId}`, `${CACHE_KEYS.PROPERTY_FAVORITES_IDS}/${userId}`]);
    return {
      message: 'Propiedad favorita eliminada correctamente',
    }
  }
}
