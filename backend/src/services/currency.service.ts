import axios from 'axios';
import { config } from '../config/env';
import { cacheService } from './cache.service';
import { logger } from '../utils/logger';

const FALLBACK_RATES: Record<string, number> = {
  USD: 5.50,
  EUR: 6.00,
  GBP: 7.00,
  CAD: 4.00,
  AUD: 3.60,
  CLP: 0.0058,
  PLN: 1.38,
};

export class CurrencyService {
  async getRate(from: string, to: string): Promise<{ rate: number; source: string; updatedAt: string }> {
    const cacheKey = `fx:${from}:${to}`;
    const cached = await cacheService.get<{ rate: number; source: string; updatedAt: string }>(cacheKey);
    if (cached) return cached;

    try {
      if (config.apis.exchangeRate.key) {
        const { data } = await axios.get(
          `${config.apis.exchangeRate.baseUrl}/${config.apis.exchangeRate.key}/pair/${from}/${to}`,
          { timeout: 8000 }
        );
        const result = {
          rate: data.conversion_rate,
          source: 'ExchangeRate-API',
          updatedAt: new Date().toISOString(),
        };
        await cacheService.set(cacheKey, result, config.cache.currencyTTL);
        return result;
      }
    } catch (error) {
      logger.warn(`ExchangeRate API failed for ${from}/${to}, using fallback`);
    }

    // Fallback gratuito: exchangerate.host / open API
    try {
      const { data } = await axios.get(
        `https://open.er-api.com/v6/latest/${from}`,
        { timeout: 8000 }
      );
      if (data?.rates?.[to]) {
        const result = {
          rate: data.rates[to],
          source: 'Open Exchange Rates (free)',
          updatedAt: new Date().toISOString(),
        };
        await cacheService.set(cacheKey, result, config.cache.currencyTTL);
        return result;
      }
    } catch (error) {
      logger.warn('Free exchange API failed, using static fallback');
    }

    return {
      rate: FALLBACK_RATES[to] ?? 1,
      source: 'static-fallback (estimado)',
      updatedAt: new Date().toISOString(),
    };
  }

  async convert(amount: number, from: string, to: string) {
    const { rate, source, updatedAt } = await this.getRate(from, to);
    return {
      amount: Math.round(amount * rate * 100) / 100,
      rate,
      from,
      to,
      source,
      updatedAt,
    };
  }
}

export const currencyService = new CurrencyService();