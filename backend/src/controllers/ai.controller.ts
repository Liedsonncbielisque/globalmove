import { Request, Response, NextFunction } from 'express';
import { aiService } from '../services/ai.service';
import { ApiError } from '../middleware/error.middleware';

export class AIController {
  async ask(req: Request, res: Response, next: NextFunction) {
    try {
      const { question, context } = req.body;

      if (!question) {
        throw new ApiError(400, 'Question is required');
      }

      const userId = (req as any).user?.id;

      const response = await aiService.processQuery({
        userId,
        question,
        context,
      });

      res.json({
        status: 'success',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const aiController = new AIController();