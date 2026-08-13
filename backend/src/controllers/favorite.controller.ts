import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { ApiError } from '../middleware/error.middleware';

export class FavoriteController {
  async getUserFavorites(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) throw new ApiError(401, 'Unauthorized');

      const { type } = req.query;

      let query = supabaseAdmin
        .from('favorites')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('type', type);
      }

      const { data: favorites, error } = await query;

      if (error) throw new ApiError(500, 'Failed to fetch favorites');

      res.json({
        status: 'success',
        data: { favorites: favorites || [] },
      });
    } catch (error) {
      next(error);
    }
  }

  async addFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) throw new ApiError(401, 'Unauthorized');

      const { type, entityId } = req.body;

      if (!type || !entityId) {
        throw new ApiError(400, 'type and entityId are required');
      }

      // Verificar se já existe
      const { data: existing } = await supabaseAdmin
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('type', type)
        .eq('entity_id', entityId)
        .maybeSingle();

      if (existing) {
        throw new ApiError(409, 'Already favorited');
      }

      const { data: favorite, error } = await supabaseAdmin
        .from('favorites')
        .insert({
          user_id: userId,
          type,
          entity_id: entityId,
        })
        .select()
        .single();

      if (error) throw new ApiError(500, 'Failed to add favorite');

      res.status(201).json({
        status: 'success',
        data: { favorite },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) throw new ApiError(401, 'Unauthorized');

      const { id } = req.params;

      const { error } = await supabaseAdmin
        .from('favorites')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw new ApiError(500, 'Failed to remove favorite');

      res.json({
        status: 'success',
        message: 'Favorite removed',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const favoriteController = new FavoriteController();