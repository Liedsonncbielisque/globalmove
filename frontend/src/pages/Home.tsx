import { Link } from 'react-router-dom';
import { ArrowRight, Globe, MapPin, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Descubra onde você{' '}
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                consegue recomeçar
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Compare países, cidades, custos e rotas de imigração com base no seu dinheiro, 
              prazo e objetivo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild>
                <Link to="/onboarding">
                  Começar minha análise
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link to="/destinos">
                  Explorar destinos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass p-6 rounded-lg hover:border-accent/50 transition-all">
            <Globe className="h-10 w-10 text-accent mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">190+</h3>
            <p className="text-gray-400">Países disponíveis</p>
          </div>
          
          <div className="glass p-6 rounded-lg hover:border-accent/50 transition-all">
            <MapPin className="h-10 w-10 text-accent-secondary mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
            <p className="text-gray-400">Cidades mapeadas</p>
          </div>
          
          <div className="glass p-6 rounded-lg hover:border-accent/50 transition-all">
            <Shield className="h-10 w-10 text-accent mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">50+</h3>
            <p className="text-gray-400">Rotas migratórias</p>
          </div>
          
          <div className="glass p-6 rounded-lg hover:border-accent/50 transition-all">
            <TrendingUp className="h-10 w-10 text-accent-secondary mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">100%</h3>
            <p className="text-gray-400">Planejamento financeiro</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Como funciona
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Um sistema inteligente que transforma seu sonho em um plano executável
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-lg">
            <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Análise Personalizada
            </h3>
            <p className="text-gray-400">
              Informe seu perfil, situação financeira e objetivos. 
              Nosso algoritmo calcula a viabilidade para cada destino.
            </p>
          </div>

          <div className="glass p-8 rounded-lg">
            <div className="bg-accent-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Ranking Inteligente
            </h3>
            <p className="text-gray-400">
              Receba recomendações de países e cidades baseadas em 
              custo, vistos, emprego e qualidade de vida.
            </p>
          </div>

          <div className="glass p-8 rounded-lg">
            <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Planejamento Financeiro
            </h3>
            <p className="text-gray-400">
              Saiba exatamente quanto precisa economizar e 
              quando poderá fazer sua mudança.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass-strong p-12 rounded-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para começar seu plano?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Transforme o sonho de morar fora em um plano financeiro, 
            profissional e migratório executável.
          </p>
          <Button size="lg" asChild>
            <Link to="/onboarding">
              Criar meu plano agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}