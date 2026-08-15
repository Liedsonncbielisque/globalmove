import type { Scenario, ViabilityStatus } from '@/types/domain';

// Taxas de câmbio ESTIMADAS (fallback estático).
// Substituídas pela API de câmbio quando o backend estiver online.
export const FALLBACK_RATES_TO_BRL: Record<string, number> = {
  BRL: 1,
  USD: 5.5,
  EUR: 6.0,
  GBP: 7.0,
  CAD: 4.0,
  AUD: 3.6,
  CLP: 0.0058,
  PLN: 1.38,
};

// Estimativa de passagem por região (só ida, por pessoa) — valor ESTIMADO.
export const FLIGHT_ESTIMATES_BRL: Record<string, number> = {
  Europa: 4500,
  'América do Norte': 5500,
  'América do Sul': 2000,
  Oceania: 8500,
};

export function getFamilyMultiplier(maritalStatus: string, children: number): number {
  if (maritalStatus === 'single') return 1;
  if (maritalStatus === 'couple') return 1.6 + children * 0.4;
  return 2.0 + children * 0.4;
}

export function calculateProjectedCapital(
  currentCapital: number,
  monthlySavings: number,
  months: number,
  scenario: Scenario
): number {
  const multipliers: Record<Scenario, number> = {
    conservative: 0.8,
    realistic: 1.0,
    aggressive: 1.2,
  };
  return currentCapital + monthlySavings * multipliers[scenario] * months;
}

export function calculateRequiredCapital(params: {
  monthlyCostBRL: number;
  rentBRL: number;
  flightBRL: number;
  emergencyMonths?: number;
}): number {
  const { monthlyCostBRL, rentBRL, flightBRL, emergencyMonths = 6 } = params;
  const visaAndDocs = 3000; // estimativa de taxas + documentação
  const initialHousing = rentBRL * 3; // 1º mês + caução (2x aluguel)
  const emergencyFund = monthlyCostBRL * emergencyMonths;
  return flightBRL + visaAndDocs + initialHousing + emergencyFund;
}

export function getViabilityStatus(projected: number, required: number): ViabilityStatus {
  if (projected >= required) return 'viable';
  if (projected >= required * 0.75) return 'close';
  return 'distant';
}

export function getMonthsToGoal(
  currentCapital: number,
  requiredCapital: number,
  monthlySavings: number
): number | null {
  if (currentCapital >= requiredCapital) return null; // já atingiu
  if (monthlySavings <= 0) return 999; // sem economia = inviável
  return Math.ceil((requiredCapital - currentCapital) / monthlySavings);
}