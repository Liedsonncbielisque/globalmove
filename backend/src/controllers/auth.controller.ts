import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '../config/supabase';
import { config } from '../config/env';
import { ApiError } from '../middleware/error.middleware';
import { logger } from '../utils/logger';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        throw new ApiError(400, 'Email, password and name are required');
      }

      if (password.length < 8) {
        throw new ApiError(400, 'Password must be at least 8 characters');
      }

      const { data: existing } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existing) throw new ApiError(409, 'Email already registered');

      const passwordHash = await bcrypt.hash(password, 10);

      const { data: user, error } = await supabaseAdmin
        .from('users')
        .insert({ email, password_hash: passwordHash, name })
        .select('id, email, name, created_at')
        .single();

      if (error) throw new ApiError(500, 'Failed to create user');

      const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      logger.info(`User registered: ${email}`);

      res.status(201).json({ status: 'success', data: { user, token } });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new ApiError(400, 'Email and password are required');
      }

      const { data: user, error } = await supabaseAdmin
        .from('users')
        .select('id, email, name, password_hash')
        .eq('email', email)
        .maybeSingle();

      if (error || !user || !user.password_hash) {
        throw new ApiError(401, 'Invalid credentials');
      }

      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) throw new ApiError(401, 'Invalid credentials');

      const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      logger.info(`User logged in: ${email}`);

      res.json({
        status: 'success',
        data: {
          user: { id: user.id, email: user.email, name: user.name },
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) throw new ApiError(401, 'Unauthorized');

      const { data: user, error } = await supabaseAdmin
        .from('users')
        .select('id, email, name, created_at')
        .eq('id', userId)
        .single();

      if (error || !user) throw new ApiError(404, 'User not found');

      res.json({ status: 'success', data: { user } });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();