import { calculationService } from '../src/services/calculation.service';

describe('CalculationService', () => {
  describe('calculateProjectedCapital', () => {
    it('should calculate realistic scenario correctly', () => {
      const result = calculationService.calculateProjectedCapital(
        {
          currentCapital: 50000,
          monthlyIncome: 8000,
          monthlySavings: 2500,
          debts: 0,
          fixedExpenses: 3000,
          variableExpenses: 1000,
        },
        { months: 12, scenario: 'realistic' }
      );
      expect(result).toBe(80000);
    });

    it('should apply conservative multiplier (80%)', () => {
      const result = calculationService.calculateProjectedCapital(
        {
          currentCapital: 50000,
          monthlyIncome: 8000,
          monthlySavings: 2500,
          debts: 0,
          fixedExpenses: 3000,
          variableExpenses: 1000,
        },
        { months: 12, scenario: 'conservative' }
      );
      expect(result).toBe(74000);
    });

    it('should apply aggressive multiplier (120%)', () => {
      const result = calculationService.calculateProjectedCapital(
        {
          currentCapital: 50000,
          monthlyIncome: 8000,
          monthlySavings: 2500,
          debts: 0,
          fixedExpenses: 3000,
          variableExpenses: 1000,
        },
        { months: 12, scenario: 'aggressive' }
      );
      expect(result).toBe(86000);
    });
  });

  describe('calculateViability', () => {
    it('should return viable when projected >= required', () => {
      const result = calculationService.calculateViability(
        {
          currentCapital: 70000,
          monthlyIncome: 8000,
          monthlySavings: 2500,
          debts: 0,
          fixedExpenses: 3000,
          variableExpenses: 1000,
        },
        { months: 12, scenario: 'realistic' },
        {
          installationCost: 15000,
          monthlyCost: 3000,
          flightCost: 5000,
          visaCost: 2000,
          documentationCost: 1000,
          initialRent: 3000,
          deposit: 3000,
        },
        6
      );
      expect(result.status).toBe('viable');
      expect(result.surplus).toBeGreaterThan(0);
    });

    it('should return distant when projected < 75% of required', () => {
      const result = calculationService.calculateViability(
        {
          currentCapital: 5000,
          monthlyIncome: 8000,
          monthlySavings: 500,
          debts: 0,
          fixedExpenses: 3000,
          variableExpenses: 1000,
        },
        { months: 6, scenario: 'realistic' },
        {
          installationCost: 15000,
          monthlyCost: 3000,
          flightCost: 5000,
          visaCost: 2000,
          documentationCost: 1000,
          initialRent: 3000,
          deposit: 3000,
        },
        6
      );
      expect(result.status).toBe('distant');
      expect(result.deficit).toBeGreaterThan(0);
      expect(result.monthsToGoal).toBeGreaterThan(0);
    });
  });

  describe('calculateMonthlyCost', () => {
    const baseCosts = {
      rent: 1000,
      food: 400,
      transport: 100,
      utilities: 150,
      internet: 50,
      health: 100,
      leisure: 200,
    };

    it('should calculate single person cost', () => {
      expect(calculationService.calculateMonthlyCost(baseCosts, 'single')).toBe(2000);
    });

    it('should calculate couple cost (1.6x)', () => {
      expect(calculationService.calculateMonthlyCost(baseCosts, 'couple')).toBe(3200);
    });

    it('should calculate family with 1 child (2.0x)', () => {
      expect(calculationService.calculateMonthlyCost(baseCosts, 'family_1')).toBe(4000);
    });
  });
});