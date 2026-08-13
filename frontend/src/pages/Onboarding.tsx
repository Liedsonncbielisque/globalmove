import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingData {
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
  scenario: 'conservative' | 'realistic' | 'aggressive';
}

const initialData: OnboardingData = {
  age: '',
  nationality: 'Brasileira',
  profession: '',
  education: '',
  yearsExperience: '',
  englishLevel: '',
  maritalStatus: '',
  adults: 1,
  children: 0,
  objective: '',
  currentCapital: '',
  monthlyIncome: '',
  monthlySavings: '',
  currency: 'BRL',
  targetMonths: 24,
  scenario: 'realistic',
};

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);
  const totalSteps = 5;

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    localStorage.setItem('globalmove_onboarding', JSON.stringify(data));
    navigate('/dashboard');
  };

  const nextStep = () => (step < totalSteps ? setStep(step + 1) : handleComplete());
  const prevStep = () => step > 1 && setStep(step - 1);

  const inputClass =
    'w-full px-4 py-2.5 bg-surface-secondary border border-surface-secondary rounded-md text-white focus:border-accent focus:outline-none';
  const labelClass = 'block text-sm font-medium text-gray-300 mb-2';

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Passo {step} de {totalSteps}
            </span>
            <span className="text-sm text-accent">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-surface-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="glass p-8 rounded-xl">
          {/* Step 1: Perfil */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Conte-nos sobre você</h2>
                <p className="text-gray-400">Informações básicas do seu perfil</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Idade</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={data.age}
                    onChange={(e) => updateData('age', e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className={labelClass}>Nacionalidade</label>
                  <input
                    className={inputClass}
                    value={data.nationality}
                    onChange={(e) => updateData('nationality', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Profissão</label>
                  <input
                    className={inputClass}
                    value={data.profession}
                    onChange={(e) => updateData('profession', e.target.value)}
                    placeholder="Desenvolvedor de Software"
                  />
                </div>
                <div>
                  <label className={labelClass}>Formação</label>
                  <select
                    className={inputClass}
                    value={data.education}
                    onChange={(e) => updateData('education', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="high_school">Ensino Médio</option>
                    <option value="bachelor">Graduação</option>
                    <option value="master">Mestrado</option>
                    <option value="phd">Doutorado</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Anos de Experiência</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={data.yearsExperience}
                    onChange={(e) => updateData('yearsExperience', e.target.value)}
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className={labelClass}>Nível de Inglês</label>
                  <select
                    className={inputClass}
                    value={data.englishLevel}
                    onChange={(e) => updateData('englishLevel', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="A1">A1 — Básico</option>
                    <option value="A2">A2 — Elementar</option>
                    <option value="B1">B1 — Intermediário</option>
                    <option value="B2">B2 — Intermediário Alto</option>
                    <option value="C1">C1 — Avançado</option>
                    <option value="C2">C2 — Fluente</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Família */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Situação familiar</h2>
                <p className="text-gray-400">Quem vai com você nessa jornada?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Estado Civil</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'single', label: 'Solteiro(a)' },
                      { value: 'couple', label: 'Casal' },
                      { value: 'family', label: 'Família' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateData('maritalStatus', opt.value)}
                        className={`p-4 rounded-lg border text-center transition-all ${
                          data.maritalStatus === opt.value
                            ? 'bg-accent/20 border-accent text-white'
                            : 'bg-surface-secondary border-surface-secondary text-gray-300 hover:border-accent/50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Adultos</label>
                    <input
                      type="number"
                      min="1"
                      className={inputClass}
                      value={data.adults}
                      onChange={(e) => updateData('adults', parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Crianças</label>
                    <input
                      type="number"
                      min="0"
                      className={inputClass}
                      value={data.children}
                      onChange={(e) => updateData('children', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Objetivo */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Qual é o seu objetivo?</h2>
                <p className="text-gray-400">Isso personaliza as recomendações</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'work', label: '💼 Trabalhar', desc: 'Oportunidades profissionais' },
                  { value: 'study', label: '🎓 Estudar', desc: 'Universidade ou especialização' },
                  { value: 'business', label: '🚀 Empreender', desc: 'Abrir ou expandir negócio' },
                  { value: 'quality_life', label: '🌟 Qualidade de Vida', desc: 'Melhorar padrão de vida' },
                  { value: 'money', label: '💰 Ganhar Dinheiro', desc: 'Maximizar ganhos' },
                  { value: 'experience', label: '✈️ Experiência', desc: 'Viver novas culturas' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateData('objective', opt.value)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      data.objective === opt.value
                        ? 'bg-accent/20 border-accent'
                        : 'bg-surface-secondary border-surface-secondary hover:border-accent/50'
                    }`}
                  >
                    <h3 className="font-semibold text-white mb-1">{opt.label}</h3>
                    <p className="text-sm text-gray-400">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Finanças */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Situação financeira</h2>
                <p className="text-gray-400">Seus dados são privados e seguros</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Capital Atual</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={data.currentCapital}
                    onChange={(e) => updateData('currentCapital', e.target.value)}
                    placeholder="50000"
                  />
                </div>
                <div>
                  <label className={labelClass}>Renda Mensal</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={data.monthlyIncome}
                    onChange={(e) => updateData('monthlyIncome', e.target.value)}
                    placeholder="8000"
                  />
                </div>
                <div>
                  <label className={labelClass}>Economia Mensal</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={data.monthlySavings}
                    onChange={(e) => updateData('monthlySavings', e.target.value)}
                    placeholder="2500"
                  />
                </div>
                <div>
                  <label className={labelClass}>Moeda</label>
                  <select
                    className={inputClass}
                    value={data.currency}
                    onChange={(e) => updateData('currency', e.target.value)}
                  >
                    <option value="BRL">BRL — Real</option>
                    <option value="USD">USD — Dólar</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — Libra</option>
                    <option value="CAD">CAD — Dólar Canadense</option>
                    <option value="AUD">AUD — Dólar Australiano</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Prazo */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Quando pretende emigrar?</h2>
                <p className="text-gray-400">Defina prazo e cenário</p>
              </div>

              <div>
                <label className={labelClass}>Prazo (meses)</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {[6, 12, 18, 24, 36, 48].map((months) => (
                    <button
                      key={months}
                      onClick={() => updateData('targetMonths', months)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        data.targetMonths === months
                          ? 'bg-accent text-background font-semibold'
                          : 'bg-surface-secondary border-surface-secondary text-gray-300 hover:border-accent/50'
                      }`}
                    >
                      {months}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Cenário de Economia</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'conservative', label: 'Conservador', desc: '80% da economia' },
                    { value: 'realistic', label: 'Realista', desc: '100% da economia' },
                    { value: 'aggressive', label: 'Agressivo', desc: '120% da economia' },
                  ].map((s) => (
                    <button
                      key={s.value}
                      onClick={() => updateData('scenario', s.value as any)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        data.scenario === s.value
                          ? 'bg-accent/20 border-accent'
                          : 'bg-surface-secondary border-surface-secondary hover:border-accent/50'
                      }`}
                    >
                      <h3 className="font-semibold text-white mb-1">{s.label}</h3>
                      <p className="text-sm text-gray-400">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>

            <Button onClick={nextStep}>
              {step === totalSteps ? (
                <>
                  Analisar Destinos
                  <CheckCircle className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}