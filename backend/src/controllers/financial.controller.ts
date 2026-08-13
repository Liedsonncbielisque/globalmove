import { Request, Response, NextFunction } from 'express';
import { calculationService } from '../services/calculation.service';
import { currencyService } from '../services/currency.service';
import { ApiError } from '../middleware/error.middleware';

export class FinancialController {
  async calculateViability(req: Request, res: Response, next: NextFunction) {
    try {
      const { financial, timeline, costs, emergencyMonths } = req.body;

      if (!financial || !timeline || !costs) {
        throw new ApiError(400, 'financial, timeline and costs are required');
      }

      const result = calculationService.calculateViability(
        financial,
        timeline,
        costs,
        emergencyMonths
      );

      res.json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  async calculateMonthlyCost(req: Request, res: Response, next: NextFunction) {
    try {
      const { baseCosts, familyType } = req.body;

      if (!baseCosts || !familyType) {
        throw new ApiError(400, 'baseCosts and familyType are required');
      }

      const monthlyCost = calculationService.calculateMonthlyCost(baseCosts, familyType);

      res.json({ status: 'success', data: { monthlyCost, familyType } });
    } catch (error) {
      next(error);
    }
  }

  async simulateScenario(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentCapital, requiredCapital, currentSavings, newSavings } = req.body;

      if (
        currentCapital === undefined ||
        requiredCapital === undefined ||
        currentSavings === undefined ||
        newSavings === undefined
      ) {
        throw new ApiError(400, 'All simulation parameters are required');
      }

      const result = calculationService.simulateScenario({
        currentCapital,
        requiredCapital,
        currentSavings,
        newSavings,
      });

      res.json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  async convertCurrency(req: Request, res: Response, next: NextFunction) {
    try {
      const { amount, from, to } = req.body;

      if (!amount || !from || !to) {
        throw new ApiError(400, 'amount, from and to are required');
      }

      const result = await currencyService.convert(Number(amount), from, to);

      res.json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  async getExchangeRate(req: Request, res: Response, next: NextFunction) {
    try {
      const { from, to } = req.params;
      const result = await currencyService.getRate(from.toUpperCase(), to.toUpperCase());
      res.json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const financialController = new FinancialController();