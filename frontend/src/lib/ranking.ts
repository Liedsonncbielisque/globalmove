import type { AnalysisResult, FallbackCountry, OnboardingData } from '@/types/domain';
import {
  FALLBACK_RATES_TO_BRL,
  FLIGHT_ESTIMATES_BRL,
  getFamilyMultiplier,
  calculateProjectedCapital,
  calculateRequiredCapital,
  getViabilityStatus,
  getMonthsToGoal,
} from './calculations';

interface Weights {
  financial: number;
  immigration: number;
  career: number;
  cost: number;
  quality: number;
  safety: number;
  personalFit: number;
}

const WEIGHTS: Record<string, Weights> = {
  work: { financial: 0.3, immigration: 0.2, career: 0.25, cost: 0.1, quality: 0.05, safety: 0.05, personalFit: 0.05 },
  study: { financial: 0.25, immigration: 0.25, career: 0.15, cost: 0.2, quality: 0.05, safety: 0.05, personalFit: 0.05 },
  quality_life: { financial: 0.2, immigration: 0.15, career: 0.1, cost: 0.15, quality: 0.25, safety: 0.1, personalFit: 0.05 },
  business: { financial: 0.35, immigration: 0.2, career: 0.15, cost: 0.15, quality: 0.05, safety: 0.05, personalFit: 0.05 },
  money: { financial: 0.35, immigration: 0.15, career: 0.25, cost: 0.1, quality: 0.05, safety: 0.05, personalFit: 0.05 },
  experience: { financial: 0.25, immigration: 0.2, career: 0.1, cost: 0.15, quality: 0.15, safety: 0.05, personalFit: 0.1 },
  default: { financial: 0.3, immigration: 0.2, career: 0.2, cost: 0.1, quality: 0.1, safety: 0.05, personalFit: 0.05 },
};

export function analyzeCountries(
  countries: FallbackCountry[],
  profile: OnboardingData
): AnalysisResult[] {
  const currentCapital = parseFloat(profile.currentCapital) || 0;
  const monthlySavings = parseFloat(profile.monthlySavings) || 0;
  const months = profile.targetMonths || 24;
  const familyMultiplier = getFamilyMultiplier(profile.maritalStatus, profile.children);
  const weights = WEIGHTS[profile.objective] || WEIGHTS.default;
  const englishOk = ['B1', 'B2', 'C1', 'C2'].includes(profile.englishLevel);

  // Custo médio (para score de custo relativo)
  const monthlyCosts = countries.map((country) => {
    const rate = FALLBACK_RATES_TO_BRL[country.currency] || 1;
    const c = country.costOfLiving;
    const local = c.rent + c.food + c.transport + c.utilities + c.internet + c.health + c.leisure;
    return local * rate * familyMultiplier;
  });
  const avgMonthlyCostBRL = monthlyCosts.reduce((a, b) => a + b, 0) / monthlyCosts.length;

  const results = countries.map((country, index) => {
    const rate = FALLBACK_RATES_TO_BRL[country.currency] || 1;
    const monthlyCostBRL = monthlyCosts[index];
    const rentBRL = country.costOfLiving.rent * rate * familyMultiplier;
    const flightBRL = FLIGHT_ESTIMATES_BRL[country.continent] || 5000;

    const requiredCapital = calculateRequiredCapital({ monthlyCostBRL, rentBRL, flightBRL });
    const projectedCapital = calculateProjectedCapital(
      currentCapital,
      monthlySavings,
      months,
      profile.scenario
    );
    const viability = getViabilityStatus(projectedCapital, requiredCapital);
    const monthsToGoal = getMonthsToGoal(currentCapital, requiredCapital, monthlySavings);

    // --- SCORES (0-100) ---
    const financialScore = Math.min(Math.round((projectedCapital / requiredCapital) * 100), 100);

    let immigrationScore = 30;
    immigrationScore += Math.min(country.visas.length * 15, 30);
    if (country.visas.some((v) => v.allowsPR)) immigrationScore += 25;
    if (country.visas.some((v) => v.renewable)) immigrationScore += 15;
    immigrationScore = Math.min(immigrationScore, 100);

    const isEnglishCountry = country.language.toLowerCase().includes('inglês');
    let careerScore = 55;
    if (isEnglishCountry && englishOk) careerScore += 25;
    if (country.visas.some((v) => v.category === 'work' || v.category === 'skilled_worker')) careerScore += 15;
    careerScore = Math.min(careerScore, 100);

    const costScore = Math.min(Math.round((avgMonthlyCostBRL / monthlyCostBRL) * 60), 100);

    const mainCity = country.cities[0];
    const qualityScore = mainCity?.qualityScore ?? 70;
    const safetyScore = mainCity?.safetyScore ?? 70;

    let personalFit = 50;
    if (country.language === 'Português') personalFit += 30;
    if (isEnglishCountry && englishOk) personalFit += 20;
    personalFit = Math.min(personalFit, 100);

    const score = Math.round(
      financialScore * weights.financial +
        immigrationScore * weights.immigration +
        careerScore * weights.career +
        costScore * weights.cost +
        qualityScore * weights.quality +
        safetyScore * weights.safety +
        personalFit * weights.personalFit
    );

    // --- EXPLICAÇÕES ---
    const reasons: string[] = [];
    const warnings: string[] = [];

    if (viability === 'viable') reasons.push('Você já atingiu a meta financeira para este destino');
    else if (viability === 'close') reasons.push('Você está próximo da meta no prazo desejado');
    else warnings.push('Capital projetado abaixo do necessário no prazo');

    if (country.language === 'Português') reasons.push('Sem barreira de idioma');
    if (isEnglishCountry && englishOk) reasons.push('Seu inglês atende aos requisitos');
    if (isEnglishCountry && !englishOk) warnings.push('Rotas podem exigir comprovação de inglês');

    if (country.visas.some((v) => v.allowsPR)) reasons.push('Rotas com caminho para residência permanente');
    if (monthlyCostBRL < avgMonthlyCostBRL) reasons.push('Custo de vida abaixo da média dos destinos');
    else warnings.push('Custo de vida acima da média dos destinos');
    if (safetyScore >= 80) reasons.push('Índices de segurança altos');

    return {
      country,
      score,
      viability,
      requiredCapital: Math.round(requiredCapital),
      projectedCapital: Math.round(projectedCapital),
      monthlyCostBRL: Math.round(monthlyCostBRL),
      monthsToGoal,
      reasons,
      warnings,
    };
  });

  return results.sort((a, b) => b.score - a.score);
}