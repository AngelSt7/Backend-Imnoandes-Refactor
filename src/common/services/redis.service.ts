
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { envs } from 'src/config';

const enum REDIS_HOST {
  LOCAL = 'localhost',
  DOCKER = 'redis',
}

@Injectable()
export class RedisService extends Redis {
  
  constructor() {
    super({
      host: envs.ambient === 'DOCKER' ? REDIS_HOST.DOCKER : REDIS_HOST.LOCAL,
      port: envs.redisPort || 6379,
    });

    this.on('error', (error) => {
      console.error(error);
      process.exit(1);
    });

    this.on('connect to redis', () => {});
  }

}
