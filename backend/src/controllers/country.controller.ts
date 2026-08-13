import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { cacheService } from '../services/cache.service';
import { ApiError } from '../middleware/error.middleware';

export class CountryController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { continent, region, limit = '50', offset = '0' } = req.query;
      const cacheKey = `countries:${continent || 'all'}:${region || 'all'}:${limit}:${offset}`;

      const cached = await cacheService.get(cacheKey);
      if (cached) return res.json({ status: 'success', data: cached, cached: true });

      let query = supabaseAdmin
        .from('countries')
        .select('*, cities(count)', { count: 'exact' })
        .eq('is_active', true)
        .order('name', { ascending: true })
        .range(Number(offset), Number(offset) + Number(limit) - 1);

      if (continent) query = query.eq('continent', continent);
      if (region) query = query.eq('region', region);

      const { data: countries, error, count } = await query;

      if (error) throw new ApiError(500, 'Failed to fetch countries');

      const result = {
        countries: countries || [],
        pagination: {
          total: count || 0,
          limit: Number(limit),
          offset: Number(offset),
          pages: Math.ceil((count || 0) / Number(limit)),
        },
      };

      await cacheService.set(cacheKey, result, 3600);
      res.json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const cacheKey = `country:${id}`;

      const cached = await cacheService.get(cacheKey);
      if (cached) return res.json({ status: 'success', data: cached, cached: true });

      const { data: country, error } = await supabaseAdmin
        .from('countries')
        .select('*, cities(*), visa_routes(*), cost_of_living(*)')
        .or(`id.eq.${id},iso_code.eq.${id.toUpperCase()},iso3.eq.${id.toUpperCase()}`)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !country) throw new ApiError(404, 'Country not found');

      await cacheService.set(cacheKey, { country }, 3600);
      res.json({ status: 'success', data: { country } });
    } catch (error) {
      next(error);
    }
  }
}

export const countryController = new CountryController();