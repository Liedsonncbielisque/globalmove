export interface RankingWeights {
  financial: number;
  immigration: number;
  career: number;
  cost: number;
  quality: number;
  safety: number;
  personalFit: number;
}

export interface DestinationScore {
  countryId: string;
  countryName: string;
  totalScore: number;
  breakdown: {
    financial: number;
    immigration: number;
    career: number;
    cost: number;
    quality: number;
    safety: number;
    personalFit: number;
  };
  reasons: string[];
  warnings: string[];
}

export class RankingService {
  getWeightsForObjective(objective: string): RankingWeights {
    const weights: Record<string, RankingWeights> = {
      work: {
        financial: 0.30,
        immigration: 0.20,
        career: 0.25,
        cost: 0.10,
        quality: 0.05,
        safety: 0.05,
        personalFit: 0.05,
      },
      study: {
        financial: 0.25,
        immigration: 0.25,
        career: 0.15,
        cost: 0.20,
        quality: 0.05,
        safety: 0.05,
        personalFit: 0.05,
      },
      quality_life: {
        financial: 0.20,
        immigration: 0.15,
        career: 0.10,
        cost: 0.15,
        quality: 0.25,
        safety: 0.10,
        personalFit: 0.05,
      },
      business: {
        financial: 0.35,
        immigration: 0.20,
        career: 0.15,
        cost: 0.15,
        quality: 0.05,
        safety: 0.05,
        personalFit: 0.05,
      },
      default: {
        financial: 0.30,
        immigration: 0.20,
        career: 0.20,
        cost: 0.10,
        quality: 0.10,
        safety: 0.05,
        personalFit: 0.05,
      },
    };

    return weights[objective] || weights.default;
  }

  calculateFinancialScore(
    requiredCapital: number,
    projectedCapital: number,
    monthlyCost: number,
    monthlyIncome: number
  ): number {
    if (requiredCapital <= 0 || monthlyCost <= 0) return 0;
    const capitalScore = Math.min((projectedCapital / requiredCapital) * 50, 50);
    const incomeRatio = monthlyIncome / monthlyCost;
    const incomeScore = Math.min(incomeRatio * 25, 50);
    return Math.round(capitalScore + incomeScore);
  }

  calculateImmigrationScore(
    visaCompatibility: 'high' | 'medium' | 'low',
    processingTimeMonths: number,
    renewable: boolean,
    allowsPR: boolean
  ): number {
    let score = 0;
    const compatScores = { high: 50, medium: 30, low: 10 };
    score += compatScores[visaCompatibility];

    if (processingTimeMonths <= 3) score += 20;
    else if (processingTimeMonths <= 6) score += 15;
    else if (processingTimeMonths <= 12) score += 10;
    else score += 5;

    if (renewable) score += 15;
    if (allowsPR) score += 15;

    return Math.min(score, 100);
  }

  calculateCareerScore(employmentRate: number, salaryScore: number, demandScore: number): number {
    return Math.round(employmentRate * 0.4 + salaryScore * 0.3 + demandScore * 0.3);
  }

  calculateCostScore(monthlyCost: number, averageCost: number): number {
    if (monthlyCost <= 0) return 0;
    const ratio = averageCost / monthlyCost;
    return Math.min(Math.round(ratio * 50), 100);
  }

  rankDestination(params: {
    countryId: string;
    countryName: string;
    financial: {
      requiredCapital: number;
      projectedCapital: number;
      monthlyCost: number;
      monthlyIncome: number;
    };
    immigration: {
      compatibility: 'high' | 'medium' | 'low';
      processingTime: number;
      renewable: boolean;
      allowsPR: boolean;
    };
    career: {
      employmentRate: number;
      salaryScore: number;
      demandScore: number;
    };
    cost: {
      monthlyCost: number;
      averageCost: number;
    };
    quality: number;
    safety: number;
    personalFit: number;
    objective: string;
  }): DestinationScore {
    const weights = this.getWeightsForObjective(params.objective);

    const breakdown = {
      financial: this.calculateFinancialScore(
        params.financial.requiredCapital,
        params.financial.projectedCapital,
        params.financial.monthlyCost,
        params.financial.monthlyIncome
      ),
      immigration: this.calculateImmigrationScore(
        params.immigration.compatibility,
        params.immigration.processingTime,
        params.immigration.renewable,
        params.immigration.allowsPR
      ),
      career: this.calculateCareerScore(
        params.career.employmentRate,
        params.career.salaryScore,
        params.career.demandScore
      ),
      cost: this.calculateCostScore(params.cost.monthlyCost, params.cost.averageCost),
      quality: params.quality,
      safety: params.safety,
      personalFit: params.personalFit,
    };

    const totalScore = Math.round(
      breakdown.financial * weights.financial +
        breakdown.immigration * weights.immigration +
        breakdown.career * weights.career +
        breakdown.cost * weights.cost +
        breakdown.quality * weights.quality +
        breakdown.safety * weights.safety +
        breakdown.personalFit * weights.personalFit
    );

    const reasons: string[] = [];
    const warnings: string[] = [];

    if (breakdown.financial >= 80) reasons.push('Excelente compatibilidade financeira');
    else if (breakdown.financial < 50) warnings.push('Capital insuficiente no prazo desejado');

    if (breakdown.immigration >= 80) reasons.push('Rotas migratórias favoráveis');
    else if (breakdown.immigration < 50) warnings.push('Processo migratório complexo');

    if (breakdown.career >= 75) reasons.push('Boas oportunidades profissionais');

    if (breakdown.cost >= 70) reasons.push('Custo de vida acessível');
    else if (breakdown.cost < 40) warnings.push('Custo de vida elevado');

    if (breakdown.quality >= 75) reasons.push('Alta qualidade de vida');

    if (breakdown.safety >= 80) reasons.push('País muito seguro');
    else if (breakdown.safety < 50) warnings.push('Índices de segurança baixos');

    return {
      countryId: params.countryId,
      countryName: params.countryName,
      totalScore,
      breakdown,
      reasons,
      warnings,
    };
  }
}

export const rankingService = new RankingService();