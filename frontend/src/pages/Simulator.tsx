import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

export default function Simulator() {
  const [data, setData] = useState<any>(null);
  const [extraSavings, setExtraSavings] = useState(500);

  useEffect(() => {
    const stored = localStorage.getItem('globalmove_onboarding');
    if (stored) setData(JSON.parse(stored));
  }, []);

  const currentCapital = parseFloat(data?.currentCapital) || 0;
  const monthlySavings = parseFloat(data?.monthlySavings) || 0;
  const currency = data?.currency || 'BRL';
  const exampleGoal = 70000; // Meta de exemplo

  const calcMonths = (savings: number) =>
    savings > 0 ? Math.max(0, Math.ceil((exampleGoal - currentCapital) / savings)) : 0;

  const beforeMonths = calcMonths(monthlySavings);
  const afterMonths = calcMonths(monthlySavings + extraSavings);
  const monthsSaved = beforeMonths - afterMonths;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Simulador "E se?"</h1>
        <p className="text-gray-400 mb-8">
          Teste cenários e veja como pequenas mudanças aceleram seu plano.
        </p>

        {!data && (
          <div className="glass p-8 rounded-lg text-center">
            <p className="text-gray-300 mb-4">Complete o onboarding primeiro para simulações personalizadas.</p>
            <Button asChild>
              <a href="/onboarding">Começar análise</a>
            </Button>
          </div>
        )}

        {data && (
          <div className="glass p-8 rounded-lg space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                E se eu economizar mais {formatCurrency(extraSavings, currency)} por mês?
              </h2>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={extraSavings}
                onChange={(e) => setExtraSavings(parseInt(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>+{formatCurrency(0, currency)}</span>
                <span>+{formatCurrency(5000, currency)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-secondary p-6 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Antes</p>
                <p className="text-3xl font-bold text-white">{beforeMonths} meses</p>
                <p className="text-sm text-gray-500 mt-1">
                  economizando {formatCurrency(monthlySavings, currency)}/mês
                </p>
              </div>
              <div className="bg-accent/10 border border-accent/30 p-6 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Depois</p>
                <p className="text-3xl font-bold text-accent">{afterMonths} meses</p>
                <p className="text-sm text-gray-500 mt-1">
                  economizando {formatCurrency(monthlySavings + extraSavings, currency)}/mês
                </p>
              </div>
            </div>

            {monthsSaved > 0 && (
              <div className="bg-success/10 border border-success/30 p-6 rounded-lg flex items-center gap-4">
                <span className="text-3xl">🎉</span>
                <div>
                  <p className="text-white font-semibold">
                    Você economizaria {monthsSaved} {monthsSaved === 1 ? 'mês' : 'meses'}!
                  </p>
                  <p className="text-gray-400 text-sm">
                    Isso aceleraria sua mudança em {monthsSaved} {monthsSaved === 1 ? 'mês' : 'meses'}.
                  </p>
                </div>
              </div>
            )}

            <Button className="w-full" asChild>
              <a href="/metas">
                Criar meta com este cenário
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}