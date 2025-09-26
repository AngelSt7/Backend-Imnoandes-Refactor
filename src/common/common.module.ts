import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheUtilsService, CollectionDiffService, CompareObjectService, HandleErrorsService, MailService, PaginationService, PrismaService, RedisService } from './services';

const COMMON_SERVICES = [
  HandleErrorsService,
  MailService,
  RedisService,
  CacheUtilsService,
  PrismaService,
  PaginationService,
  CollectionDiffService,
  CompareObjectService
];

@Module({
  imports: [ConfigModule],
  providers: [...COMMON_SERVICES],
  exports: [...COMMON_SERVICES],
})
export class CommonModule {}
