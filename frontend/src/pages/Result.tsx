import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Sparkles,
  Scale,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { analyzeCountries } from '@/lib/ranking';
import { FALLBACK_COUNTRIES } from '@/lib/fallback-data';
import type { AnalysisResult, OnboardingData, ViabilityStatus } from '@/types/domain';

const OBJECTIVE_LABELS: Record<string, string> = {
  work: '💼 Trabalhar',
  study: '🎓 Estudar',
  business: '🚀 Empreender',
  quality_life: '🌟 Qualidade de vida',
  money: '💰 Ganhar dinheiro',
  experience: '✈️ Experiência internacional',
};

function ScoreRing({ score }: { score: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-20 h-20 -rotate-90" aria-hidden="true">
        <circle cx="40" cy="40" r={radius} stroke="#122238" strokeWidth="8" fill="none" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-white leading-none">{score}</span>
        <span className="text-[10px] text-gray-500">/100</span>
      </div>
    </div>
  );
}

function ViabilityBadge({ status }: { status: ViabilityStatus }) {
  const config = {
    viable: { icon: CheckCircle, label: 'Viável', classes: 'bg-success/10 text-success border-success/30' },
    close: { icon: AlertTriangle, label: 'Próximo', classes: 'bg-warning/10 text-warning border-warning/30' },
    distant: { icon: XCircle, label: 'Distante', classes: 'bg-error/10 text-error border-error/30' },
  } as const;

  const { icon: Icon, label, classes } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium ${classes}`}>
      <Icon className="h-4 w-4" />
      {label}
    </span>
  );
}

function ResultCard({ result, rank }: { result: AnalysisResult; rank: number }) {
  const { country } = result;

  return (
    <div className="glass rounded-xl p-6 hover:border-accent/40 transition-all">
      <div className="flex items-start gap-4 mb-5">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-xs font-bold text-gray-500 w-6">#{rank}</span>
          <span className="text-4xl">{country.flag}</span>
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-white truncate">{country.name}</h3>
            <p className="text-sm text-gray-400">{country.continent}</p>
          </div>
        </div>
        <ScoreRing score={result.score} />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <ViabilityBadge status={result.viability} />
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-surface-secondary text-sm text-gray-300">
          <Clock className="h-4 w-4" />
          {result.monthsToGoal === null
            ? 'Meta já atingida'
            : result.monthsToGoal >= 999
            ? 'Aumente a economia mensal'
            : `~${result.monthsToGoal} meses para a meta`}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-surface-secondary/60 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Capital necessário</p>
          <p className="text-white font-semibold">{formatCurrency(result.requiredCapital, 'BRL')}</p>
        </div>
        <div className="bg-surface-secondary/60 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Seu capital projetado</p>
          <p className={`font-semibold ${result.viability === 'distant' ? 'text-warning' : 'text-accent'}`}>
            {formatCurrency(result.projectedCapital, 'BRL')}
          </p>
        </div>
      </div>

      <div className="space-y-1.5 mb-5">
        {result.reasons.slice(0, 3).map((reason) => (
          <p key={reason} className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-success mt-0.5">+</span> {reason}
          </p>
        ))}
        {result.warnings.slice(0, 2).map((warning) => (
          <p key={warning} className="text-sm text-gray-400 flex items-start gap-2">
            <span className="text-warning mt-0.5">−</span> {warning}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <Button size="sm" className="flex-1" asChild>
          <Link to={`/destinos/${country.iso_code.toLowerCase()}`}>Ver custos e vistos</Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link to="/comparar">
            <Scale className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function Result() {
  const [profile, setProfile] = useState<OnboardingData | null>(null);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('globalmove_onboarding');
    if (stored) {
      try {
        const data = JSON.parse(stored) as OnboardingData;
        setProfile(data);
        setResults(analyzeCountries(FALLBACK_COUNTRIES, data));
      } catch {
        setProfile(null);
      }
    }
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="glass p-12 rounded-xl animate-pulse">
            <div className="h-8 bg-surface-secondary rounded w-1/2 mb-4" />
            <div className="h-4 bg-surface-secondary rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="glass p-12 rounded-xl">
            <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Descubra seu ranking</h1>
            <p className="text-gray-400 mb-8">
              Responda 5 perguntas rápidas e receba os destinos mais viáveis para o seu perfil,
              dinheiro e prazo.
            </p>
            <Button size="lg" asChild>
              <Link to="/onboarding">
                Analisar meu perfil
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const top3 = results.slice(0, 3);
  const rest = results.slice(3);
  const capital = parseFloat(profile.currentCapital) || 0;
  const savings = parseFloat(profile.monthlySavings) || 0;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Seu ranking personalizado
          </h1>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-surface-secondary rounded-full text-gray-300">
              💰 {formatCurrency(capital, 'BRL')} hoje
            </span>
            <span className="px-3 py-1 bg-surface-secondary rounded-full text-gray-300">
              📈 {formatCurrency(savings, 'BRL')}/mês
            </span>
            <span className="px-3 py-1 bg-surface-secondary rounded-full text-gray-300">
              📅 {profile.targetMonths} meses
            </span>
            <span className="px-3 py-1 bg-surface-secondary rounded-full text-gray-300">
              {OBJECTIVE_LABELS[profile.objective] || '🎯 Seu objetivo'}
            </span>
          </div>
        </div>

        {/* Top 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {top3.map((result, i) => (
            <ResultCard key={result.country.id} result={result} rank={i + 1} />
          ))}
        </div>

        {/* Demais destinos */}
        {rest.length > 0 && (
          <div className="glass rounded-xl overflow-hidden mb-10">
            <div className="p-5 border-b border-surface-secondary">
              <h2 className="text-lg font-semibold text-white">Outros destinos avaliados</h2>
            </div>
            <div className="divide-y divide-surface-secondary">
              {rest.map((result, i) => (
                <Link
                  key={result.country.id}
                  to={`/destinos/${result.country.iso_code.toLowerCase()}`}
                  className="flex items-center gap-4 p-4 hover:bg-surface-secondary/40 transition-colors"
                >
                  <span className="text-xs font-bold text-gray-500 w-6">#{i + 4}</span>
                  <span className="text-2xl">{result.country.flag}</span>
                  <span className="text-white font-medium flex-1">{result.country.name}</span>
                  <ViabilityBadge status={result.viability} />
                  <span className="text-accent font-bold w-12 text-right">{result.score}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Salvar */}
        <div className="glass-strong rounded-xl p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Salve seu plano</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Crie sua conta para acompanhar sua meta, receber alertas de câmbio e
            desbloquear o comparador completo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link to="/registro">
                Salvar meu plano
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/simulador">Testar cenários "e se?"</Link>
            </Button>
          </div>
        </div>

        <p className="text-xs text-gray-600 text-center max-w-2xl mx-auto">
          Valores estimados com base em dados agregados e taxas de câmbio aproximadas.
          Este ranking não garante aprovação de visto. Consulte sempre as fontes oficiais
          de imigração de cada país antes de tomar decisões.
        </p>
      </div>
    </div>
  );
}