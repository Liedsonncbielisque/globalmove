import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { ApiError } from '../middleware/error.middleware';

export class AdminController {
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const [users, countries, cities, visas, goals] = await Promise.all([
        supabaseAdmin.from('users').select('count'),
        supabaseAdmin.from('countries').select('count'),
        supabaseAdmin.from('cities').select('count'),
        supabaseAdmin.from('visa_routes').select('count'),
        supabaseAdmin.from('goals').select('count'),
      ]);

      res.json({
        status: 'success',
        data: {
          users: users.count || 0,
          countries: countries.count || 0,
          cities: cities.count || 0,
          visas: visas.count || 0,
          goals: goals.count || 0,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async addCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const { data: country, error } = await supabaseAdmin
        .from('countries')
        .insert(data)
        .select()
        .single();

      if (error) throw new ApiError(500, 'Failed to add country');

      res.status(201).json({
        status: 'success',
        data: { country },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;

      const { data: country, error } = await supabaseAdmin
        .from('countries')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new ApiError(500, 'Failed to update country');

      res.json({
        status: 'success',
        data: { country },
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleCountryStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { data: country } = await supabaseAdmin
        .from('countries')
        .select('is_active')
        .eq('id', id)
        .single();

      if (!country) throw new ApiError(404, 'Country not found');

      const { data: updated, error } = await supabaseAdmin
        .from('countries')
        .update({ is_active: !country.is_active })
        .eq('id', id)
        .select()
        .single();

      if (error) throw new ApiError(500, 'Failed to toggle country status');

      res.json({
        status: 'success',
        data: { country: updated },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();