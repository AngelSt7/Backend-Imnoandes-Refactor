import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CACHE_KEYS } from '@/cache/cache-keys';
import { QueryAwareCacheInterceptor } from '@/common/interceptors/cache';

export const CACHE_KEY_META = 'cache_base_key';
export const CACHE_TTL_META = 'cache_ttl';

export function Cached(baseKey: CACHE_KEYS, ttlSeconds = 120) {
  return applyDecorators(
    SetMetadata(CACHE_KEY_META, baseKey),
    SetMetadata(CACHE_TTL_META, ttlSeconds),
    UseInterceptors(QueryAwareCacheInterceptor)
  );
}
