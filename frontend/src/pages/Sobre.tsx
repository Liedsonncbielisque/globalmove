import { Globe, Target, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Sobre() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">

        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 mb-6">
            <Globe className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transformando o sonho de morar fora em um plano real
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            A GlobalMove nasceu de uma pergunta simples: <em>"Será que eu consigo morar fora?"</em>
            Nossa missão é transformar essa dúvida em clareza — com dados, simulações e ferramentas
            práticas que ajudam brasileiros a planejar sua jornada migratória com segurança.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
          <div className="glass p-8 rounded-xl text-center">
            <Target className="h-10 w-10 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Clareza</h3>
            <p className="text-gray-400 text-sm">
              Transformamos informações complexas sobre imigração, vistos e custos
              em análises simples e acionáveis.
            </p>
          </div>

          <div className="glass p-8 rounded-xl text-center">
            <Heart className="h-10 w-10 text-accent-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Honestidade</h3>
            <p className="text-gray-400 text-sm">
              Não prometemos aprovação de vistos. Entregamos informação real,
              baseada em dados públicos, para você decidir com consciência.
            </p>
          </div>

          <div className="glass p-8 rounded-xl text-center">
            <Users className="h-10 w-10 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Comunidade</h3>
            <p className="text-gray-400 text-sm">
              Construímos um espaço para quem sonha em morar fora — com conteúdo,
              ferramentas e suporte para cada etapa do planejamento.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="glass p-10 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Nossa história</h2>
            <div className="prose-blog space-y-4">
              <p>
                A GlobalMove foi criada por brasileiros que viveram de perto as dificuldades de
                planejar uma mudança internacional: a dificuldade de encontrar informações
                confiáveis, calcular custos reais e entender quais países são viáveis
                para o seu perfil específico.
              </p>
              <p>
                Percebemos que a maioria das pessoas desiste não por falta de vontade,
                mas por falta de clareza. Sem saber quanto guardar, quanto tempo leva
                ou quais vistos se aplicam ao seu caso, o sonho fica parado no campo das ideias.
              </p>
              <p>
                A GlobalMove existe para mudar isso. Nossa plataforma reúne dados sobre mais de
                190 países, simula cenários financeiros e personaliza recomendações com base
                no <em>seu</em> perfil — não em casos genéricos.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Pronto para começar?</h2>
          <p className="text-gray-400 mb-8">Descubra quais países combinam com o seu perfil em minutos.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/onboarding">Começar análise gratuita</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contato">Falar com a equipe</Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
