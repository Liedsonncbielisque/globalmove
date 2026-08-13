import { useState, useEffect } from 'react';
import { Target, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function Goals() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('globalmove_onboarding');
    if (stored) setData(JSON.parse(stored));
  }, []);

  const currentCapital = parseFloat(data?.currentCapital) || 0;
  const monthlySavings = parseFloat(data?.monthlySavings) || 0;
  const currency = data?.currency || 'BRL';
  const goalAmount = 70000;
  const remaining = Math.max(0, goalAmount - currentCapital);
  const monthsToGoal = monthlySavings > 0 ? Math.ceil(remaining / monthlySavings) : 0;
  const progress = Math.min((currentCapital / goalAmount) * 100, 100);

  if (!data) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="glass p-12 rounded-xl">
            <h1 className="text-3xl font-bold text-white mb-4">Nenhuma meta criada</h1>
            <p className="text-gray-400">Complete o onboarding para criar sua primeira meta.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Minha Meta</h1>

        <div className="glass p-8 rounded-lg mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Meta de Emigração</h2>
              <p className="text-gray-400 text-sm">Capital necessário estimado</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-400">Meta</p>
              <p className="text-xl font-bold text-white">{formatCurrency(goalAmount, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Atual</p>
              <p className="text-xl font-bold text-white">{formatCurrency(currentCapital, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Faltam</p>
              <p className="text-xl font-bold text-warning">{formatCurrency(remaining, currency)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Previsão</p>
              <p className="text-xl font-bold text-accent">
                {remaining === 0 ? 'Meta atingida! 🎉' : `${monthsToGoal} meses`}
              </p>
            </div>
          </div>

          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-400">Progresso</span>
            <span className="text-accent font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="h-4 bg-surface-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="glass p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold text-white">Evolução Projetada</h3>
          </div>
          <div className="space-y-2">
            {Array.from({ length: Math.min(monthsToGoal, 8) }, (_, i) => {
              const monthCapital = currentCapital + monthlySavings * (i + 1);
              const monthProgress = Math.min((monthCapital / goalAmount) * 100, 100);
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-14">Mês {i + 1}</span>
                  <div className="flex-1 h-2 bg-surface-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent/60 rounded-full"
                      style={{ width: `${monthProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-24 text-right">
                    {formatCurrency(monthCapital, currency)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}