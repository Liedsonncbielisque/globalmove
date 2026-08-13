import { createClient } from 'redis';
import { config } from '../config/env';
import { logger } from '../utils/logger';

class CacheService {
  private client: ReturnType<typeof createClient> | null = null;
  private connected = false;

  async connect(): Promise<void> {
    if (this.connected) return;
    try {
      this.client = createClient({ url: config.redis.url });
      this.client.on('error', (err) => logger.error('Redis error:', err));
      await this.client.connect();
      this.connected = true;
      logger.info('✅ Redis connected');
    } catch (error) {
      logger.warn('⚠️ Redis unavailable — cache disabled');
      this.client = null;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.client) return null;
    try {
      const data = await this.client.get(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch {
      return null;
    }
  }

  async set(key: string, value: unknown, ttl: number = 3600): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.setEx(key, ttl, JSON.stringify(value));
    } catch (error) {
      logger.error(`Cache set error (${key}):`, error);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.del(key);
    } catch (error) {
      logger.error(`Cache delete error (${key}):`, error);
    }
  }

  async delPattern(pattern: string): Promise<void> {
    if (!this.client) return;
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) await this.client.del(keys);
    } catch (error) {
      logger.error(`Cache pattern delete error (${pattern}):`, error);
    }
  }
}

export const cacheService = new CacheService();