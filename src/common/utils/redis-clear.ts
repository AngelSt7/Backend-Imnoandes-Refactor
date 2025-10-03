import { envs } from "@/config";
import Redis from "ioredis";

export async function clear() {
  const redis = new Redis({
    host: envs.hostRedis,
    port: envs.portRedis,
    username: envs.usernameRedis,
    password: envs.passwordRedis,
    lazyConnect: true,
  });

  try {
    await redis.connect();
    await redis.flushall();
  } catch (error) {
  } finally {
    await redis.quit();
  }
}
