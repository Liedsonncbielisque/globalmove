import { Request, Response, NextFunction } from 'express';
import { alertService } from '../services/alert.service';
import { ApiError } from '../middleware/error.middleware';

export class AlertController {
  async getUserAlerts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) throw new ApiError(401, 'Unauthorized');

      const { unreadOnly } = req.query;
      const alerts = await alertService.getUserAlerts(userId, unreadOnly === 'true');

      res.json({
        status: 'success',
        data: { alerts },
      });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const success = await alertService.markAsRead(id);

      if (!success) throw new ApiError(500, 'Failed to mark alert as read');

      res.json({
        status: 'success',
        message: 'Alert marked as read',
      });
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) throw new ApiError(401, 'Unauthorized');

      const success = await alertService.markAllAsRead(userId);

      if (!success) throw new ApiError(500, 'Failed to mark all alerts as read');

      res.json({
        status: 'success',
        message: 'All alerts marked as read',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const alertController = new AlertController();