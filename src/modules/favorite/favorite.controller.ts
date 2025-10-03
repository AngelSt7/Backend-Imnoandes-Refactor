import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Auth, GetUser } from '@/modules/auth/decorators';
import { Property, User } from 'generated/prisma';
import { CreateFavoriteDto, QueryPaginationDto } from './dto';
import { RedisService } from '@/common/services';
import { CACHE_KEYS } from '@/cache/cache-keys';
import { TTL } from '@/cache/ttls';

@Controller('favorite')
@Auth()
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoriteService,
    private readonly redisService: RedisService
  ) { }

  @Post()
  async create(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Body() createFavoriteDto: CreateFavoriteDto
  ) {
    return await this.favoritesService.create(userId, createFavoriteDto);
  }


  @Get('/ids')
  async getFavoritesIds(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
  ) {
    const key = `${CACHE_KEYS.PROPERTY_FAVORITES_IDS}/${userId}`;
    const cached = await this.redisService.get(key);
    if (cached) return JSON.parse(cached);
    const data = await this.favoritesService.getFavoritesIds(userId);
    this.redisService.set(key, JSON.stringify(data), 'EX', TTL.ONE_HOUR);
    return data
  }

  @Get()
  async findAll(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Query() query: QueryPaginationDto
  ) {
    const key = `${CACHE_KEYS.PROPERTY_FAVORITES}/${userId}:${JSON.stringify(query)}`;
    const cached = await this.redisService.get(key);
    if (cached) return JSON.parse(cached);
    const data = await this.favoritesService.findAll(userId, query);
    this.redisService.set(key, JSON.stringify(data), 'EX', TTL.ONE_HOUR);
    return data
  }

  @Delete(':propertyId')
  remove(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Param('propertyId', ParseUUIDPipe) propertyId: Property['id']
  ) {
    return this.favoritesService.remove(userId, propertyId);
  }
}
