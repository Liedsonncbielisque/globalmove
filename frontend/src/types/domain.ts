export type Objective =
  | 'work'
  | 'study'
  | 'business'
  | 'quality_life'
  | 'money'
  | 'experience';

export type ViabilityStatus = 'viable' | 'close' | 'distant';

export type Scenario = 'conservative' | 'realistic' | 'aggressive';

export interface OnboardingData {
  age: string;
  nationality: string;
  profession: string;
  education: string;
  yearsExperience: string;
  englishLevel: string;
  maritalStatus: string;
  adults: number;
  children: number;
  objective: string;
  currentCapital: string;
  monthlyIncome: string;
  monthlySavings: string;
  currency: string;
  targetMonths: number;
  scenario: Scenario;
}

export interface CountryCost {
  rent: number;
  food: number;
  transport: number;
  utilities: number;
  internet: number;
  health: number;
  leisure: number;
  currency: string;
}

export interface CountryVisa {
  name: string;
  category: string;
  processingTime: string;
  renewable: boolean;
  allowsPR: boolean;
}

export interface CountryCity {
  name: string;
  population: number;
  safetyScore: number;
  qualityScore: number;
}

export interface FallbackCountry {
  id: string;
  name: string;
  iso_code: string;
  flag: string;
  continent: string;
  currency: string;
  population: number;
  capital: string;
  language: string;
  costOfLiving: CountryCost;
  visas: CountryVisa[];
  cities: CountryCity[];
}

export interface AnalysisResult {
  country: FallbackCountry;
  score: number;
  viability: ViabilityStatus;
  requiredCapital: number;
  projectedCapital: number;
  monthlyCostBRL: number;
  monthsToGoal: number | null;
  reasons: string[];
  warnings: string[];
}