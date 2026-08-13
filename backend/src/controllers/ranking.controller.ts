import { Request, Response, NextFunction } from 'express';
import { rankingService } from '../services/ranking.service';
import { ApiError } from '../middleware/error.middleware';

export class RankingController {
  async calculate(req: Request, res: Response, next: NextFunction) {
    try {
      const { destinations } = req.body;

      if (!destinations || !Array.isArray(destinations)) {
        throw new ApiError(400, 'destinations array is required');
      }

      const rankings = destinations.map((dest) => rankingService.rankDestination(dest));
      rankings.sort((a, b) => b.totalScore - a.totalScore);

      res.json({
        status: 'success',
        data: {
          rankings,
          topDestination: rankings[0] || null,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getWeights(req: Request, res: Response, next: NextFunction) {
    try {
      const { objective } = req.params;
      const weights = rankingService.getWeightsForObjective(objective || 'default');
      res.json({ status: 'success', data: { objective, weights } });
    } catch (error) {
      next(error);
    }
  }
}

export const rankingController = new RankingController();