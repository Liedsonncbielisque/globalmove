import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, PiggyBank, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface OnboardingData {
  currentCapital: string;
  monthlySavings: string;
  targetMonths: number;
  currency: string;
  objective: string;
  scenario: string;
}

export default function Dashboard() {
  const [data, setData] = useState<OnboardingData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('globalmove_onboarding');
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="glass p-12 rounded-xl">
            <h1 className="text-3xl font-bold text-white mb-4">
              Você ainda não fez sua análise
            </h1>
            <p className="text-gray-400 mb-8">
              Complete o onboarding para receber seu ranking personalizado de destinos.
            </p>
            <Button size="lg" asChild>
              <Link to="/onboarding">
                Começar análise
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentCapital = parseFloat(data.currentCapital) || 0;
  const monthlySavings = parseFloat(data.monthlySavings) || 0;
  const scenarioMultiplier =
    data.scenario === 'conservative' ? 0.8 : data.scenario === 'aggressive' ? 1.2 : 1.0;
  const projectedCapital = currentCapital + monthlySavings * scenarioMultiplier * data.targetMonths;

  const estimatedDate = new Date();
  estimatedDate.setMonth(estimatedDate.getMonth() + data.targetMonths);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Meu Painel</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <PiggyBank className="h-8 w-8 text-accent" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Capital Atual</p>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(currentCapital, data.currency)}
            </p>
          </div>

          <div className="glass p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-accent-secondary" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Economia Mensal</p>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(monthlySavings, data.currency)}
            </p>
          </div>

          <div className="glass p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-accent" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Capital Projetado</p>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(projectedCapital, data.currency)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              em {data.targetMonths} meses (cenário {data.scenario})
            </p>
          </div>

          <div className="glass p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-8 w-8 text-accent-secondary" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Data Estimada</p>
            <p className="text-2xl font-bold text-white">
              {estimatedDate.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="glass p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Evolução do Capital</h2>
          <div className="space-y-3">
            {Array.from({ length: Math.min(data.targetMonths, 12) }, (_, i) => {
              const monthCapital = currentCapital + monthlySavings * scenarioMultiplier * (i + 1);
              const percentage = Math.min((monthCapital / projectedCapital) * 100, 100);
              return (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 w-16">Mês {i + 1}</span>
                  <div className="flex-1 h-3 bg-surface-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-white w-28 text-right">
                    {formatCurrency(monthCapital, data.currency)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/destinos" className="glass p-6 rounded-lg hover:border-accent/50 transition-all">
            <h3 className="text-lg font-semibold text-white mb-2">🌎 Explorar Destinos</h3>
            <p className="text-gray-400 text-sm">Veja países recomendados para seu perfil</p>
          </Link>
          <Link to="/comparar" className="glass p-6 rounded-lg hover:border-accent/50 transition-all">
            <h3 className="text-lg font-semibold text-white mb-2">⚖️ Comparar</h3>
            <p className="text-gray-400 text-sm">Compare até 4 destinos lado a lado</p>
          </Link>
          <Link to="/simulador" className="glass p-6 rounded-lg hover:border-accent/50 transition-all">
            <h3 className="text-lg font-semibold text-white mb-2">🧪 Simulador</h3>
            <p className="text-gray-400 text-sm">Teste cenários "e se?"</p>
          </Link>
        </div>
      </div>
    </div>
  );
}