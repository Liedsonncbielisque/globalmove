export interface FinancialInput {
  currentCapital: number;
  monthlyIncome: number;
  partnerIncome?: number;
  monthlySavings: number;
  debts: number;
  fixedExpenses: number;
  variableExpenses: number;
}

export interface TimelineInput {
  months: number;
  scenario: 'conservative' | 'realistic' | 'aggressive';
}

export interface DestinationCosts {
  installationCost: number;
  monthlyCost: number;
  flightCost: number;
  visaCost: number;
  documentationCost: number;
  initialRent: number;
  deposit: number;
}

export interface ViabilityResult {
  requiredCapital: number;
  projectedCapital: number;
  deficit: number;
  surplus: number;
  status: 'viable' | 'close' | 'distant';
  monthsToGoal: number;
  percentageAchieved: number;
}

export class CalculationService {
  calculateProjectedCapital(financial: FinancialInput, timeline: TimelineInput): number {
    const multipliers = { conservative: 0.8, realistic: 1.0, aggressive: 1.2 };
    const monthlySavings = financial.monthlySavings * multipliers[timeline.scenario];
    return financial.currentCapital + monthlySavings * timeline.months;
  }

  calculateRequiredCapital(costs: DestinationCosts, emergencyMonths: number = 6): number {
    const emergencyFund = costs.monthlyCost * emergencyMonths;
    return (
      costs.installationCost +
      emergencyFund +
      costs.visaCost +
      costs.flightCost +
      costs.documentationCost +
      costs.initialRent +
      costs.deposit
    );
  }

  calculateViability(
    financial: FinancialInput,
    timeline: TimelineInput,
    costs: DestinationCosts,
    emergencyMonths: number = 6
  ): ViabilityResult {
    const requiredCapital = this.calculateRequiredCapital(costs, emergencyMonths);
    const projectedCapital = this.calculateProjectedCapital(financial, timeline);
    const difference = projectedCapital - requiredCapital;
    const percentageAchieved = requiredCapital > 0
      ? (projectedCapital / requiredCapital) * 100
      : 0;

    let status: 'viable' | 'close' | 'distant';
    if (projectedCapital >= requiredCapital) status = 'viable';
    else if (projectedCapital >= requiredCapital * 0.75) status = 'close';
    else status = 'distant';

    let monthsToGoal = 0;
    if (projectedCapital < requiredCapital && financial.monthlySavings > 0) {
      const remaining = requiredCapital - financial.currentCapital;
      monthsToGoal = Math.max(0, Math.ceil(remaining / financial.monthlySavings));
    }

    return {
      requiredCapital: Math.round(requiredCapital * 100) / 100,
      projectedCapital: Math.round(projectedCapital * 100) / 100,
      deficit: difference < 0 ? Math.abs(Math.round(difference * 100) / 100) : 0,
      surplus: difference > 0 ? Math.round(difference * 100) / 100 : 0,
      status,
      monthsToGoal,
      percentageAchieved: Math.round(percentageAchieved * 100) / 100,
    };
  }

  calculateMonthlyCost(
    baseCosts: {
      rent: number;
      food: number;
      transport: number;
      utilities: number;
      internet: number;
      health: number;
      leisure: number;
    },
    familyType: 'single' | 'couple' | 'family_1' | 'family_2'
  ): number {
    const multipliers = { single: 1, couple: 1.6, family_1: 2.0, family_2: 2.4 };
    const total = Object.values(baseCosts).reduce((sum, cost) => sum + cost, 0);
    return Math.round(total * multipliers[familyType] * 100) / 100;
  }

  convertCurrency(amount: number, rate: number): number {
    return Math.round(amount * rate * 100) / 100;
  }

  simulateScenario(params: {
    currentCapital: number;
    requiredCapital: number;
    currentSavings: number;
    newSavings: number;
  }) {
    const { currentCapital, requiredCapital, currentSavings, newSavings } = params;

    const calcMonths = (savings: number) =>
      savings > 0 ? Math.max(0, Math.ceil((requiredCapital - currentCapital) / savings)) : 0;

    const currentMonths = calcMonths(currentSavings);
    const newMonths = calcMonths(newSavings);
    const monthsSaved = currentMonths - newMonths;

    return {
      current: { monthlySavings: currentSavings, monthsToGoal: currentMonths },
      new: { monthlySavings: newSavings, monthsToGoal: newMonths },
      improvement: {
        monthsSaved,
        percentageReduction:
          currentMonths > 0 ? Math.round((monthsSaved / currentMonths) * 100) : 0,
      },
    };
  }
}

export const calculationService = new CalculationService();