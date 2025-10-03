import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { envs } from '@/config';

const enum DOCKER_REDIS{
  HOST = 'redis',
  PORT = 6379
}

@Injectable()
export class RedisService extends Redis {
  constructor() {
    super({
      host: envs.nodeEnv === 'DEVELOPMENT' ? DOCKER_REDIS.HOST : envs.hostRedis,
      port: envs.nodeEnv === 'DEVELOPMENT' ? DOCKER_REDIS.PORT : envs.portRedis,
      ...(envs.nodeEnv === 'DEVELOPMENT'
        ? {}
        : { username: envs.usernameRedis, password: envs.passwordRedis }),
    });

    this.on('connect', () => console.log('✅ Connected to Redis'));
    this.on('ready', () => console.log('🚀 Redis ready to use!'));
    this.on('error', (err) => {
      console.error('❌ Redis error:', err);
      process.exit(1);
    });
    this.on('reconnecting', () => console.warn('🔄 Reconnecting to Redis...'));
  }
}
