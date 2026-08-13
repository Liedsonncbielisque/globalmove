import { rankingService } from '../src/services/ranking.service';

describe('RankingService', () => {
  describe('getWeightsForObjective', () => {
    it('should return work weights', () => {
      const weights = rankingService.getWeightsForObjective('work');
      expect(weights.career).toBe(0.25);
      expect(weights.financial).toBe(0.30);
    });

    it('should return default weights for unknown objective', () => {
      const weights = rankingService.getWeightsForObjective('unknown');
      expect(weights.financial).toBe(0.30);
    });
  });

  describe('rankDestination', () => {
    it('should rank a destination with good financials highly', () => {
      const result = rankingService.rankDestination({
        countryId: '1',
        countryName: 'Polônia',
        financial: {
          requiredCapital: 50000,
          projectedCapital: 80000,
          monthlyCost: 3000,
          monthlyIncome: 8000,
        },
        immigration: {
          compatibility: 'high',
          processingTime: 3,
          renewable: true,
          allowsPR: true,
        },
        career: {
          employmentRate: 85,
          salaryScore: 75,
          demandScore: 80,
        },
        cost: {
          monthlyCost: 3000,
          averageCost: 4000,
        },
        quality: 75,
        safety: 80,
        personalFit: 70,
        objective: 'work',
      });

      expect(result.totalScore).toBeGreaterThan(70);
      expect(result.reasons.length).toBeGreaterThan(0);
      expect(result.breakdown.financial).toBe(100);
    });

    it('should add warnings for poor financials', () => {
      const result = rankingService.rankDestination({
        countryId: '2',
        countryName: 'Suíça',
        financial: {
          requiredCapital: 100000,
          projectedCapital: 30000,
          monthlyCost: 8000,
          monthlyIncome: 5000,
        },
        immigration: {
          compatibility: 'low',
          processingTime: 12,
          renewable: false,
          allowsPR: false,
        },
        career: {
          employmentRate: 50,
          salaryScore: 90,
          demandScore: 40,
        },
        cost: {
          monthlyCost: 8000,
          averageCost: 4000,
        },
        quality: 90,
        safety: 95,
        personalFit: 50,
        objective: 'work',
      });

      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.totalScore).toBeLessThan(60);
    });
  });
});