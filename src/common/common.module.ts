import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HandleErrorsService } from './services/handle-errors.service';
import { MailService } from './services/mail.service';
import { CacheUtilsService } from './services/cache-utils.service';
import { RedisService } from './services/redis.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [ConfigModule],
  providers: [
    HandleErrorsService,
    MailService,
    RedisService,
    CacheUtilsService,
    PrismaService,
  ],
  exports: [
    HandleErrorsService,
    MailService,
    RedisService,
    CacheUtilsService,
    PrismaService,
  ],
})
export class CommonModule {}
