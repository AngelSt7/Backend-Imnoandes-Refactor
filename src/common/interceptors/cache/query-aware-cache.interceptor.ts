import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CACHE_KEY_META, CACHE_TTL_META } from 'src/common/decorators/cache/cached.decorator';
import { RedisService } from 'src/common/services/redis/redis.service';
import { CACHE_KEYS } from 'src/cache/cache-keys';
import { CacheUtilsService } from 'src/common/services';

@Injectable()
export class QueryAwareCacheInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
    private readonly cacheUtilsService: CacheUtilsService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();

    if (request.method !== 'GET') return next.handle();

    const handler = context.getHandler();
    const baseKey = this.reflector.get<CACHE_KEYS>(CACHE_KEY_META, handler) ?? 'default';
    const ttl = this.reflector.get<number>(CACHE_TTL_META, handler) ?? 60;

    const query = request.query;
    const resource = Object.values(request.params).join('/');
    const finalKey = this.cacheUtilsService.generateCacheKey(baseKey, query, resource);

    const cached = await this.redisService.get(finalKey);
    if (cached)  {
      console.log('cache tomada');
      return of(JSON.parse(cached));
    }
    
    return next.handle().pipe(
      tap(async (data) => {
        await this.redisService.set(finalKey, JSON.stringify(data), 'EX', ttl);
      }),
    );
  }
}
