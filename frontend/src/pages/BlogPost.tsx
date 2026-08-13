import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { AdBanner } from '@/components/ads/AdBanner';
import { AdInArticle } from '@/components/ads/AdInArticle';

export default function BlogPost() {
  const post = {
    title: 'Como Morar na Polônia em 2026: Guia Completo para Brasileiros',
    date: '2026-08-10',
    readTime: '8 min',
    category: 'Guias',
    image: 'https://images.unsplash.com/photo-1607427293702-036933bbf746?w=1200&q=80',
    content: `
      <p class="lead">A Polônia se tornou um dos destinos mais procurados por brasileiros que desejam morar na Europa. Com custo de vida acessível, economia em crescimento e processo migratório relativamente simples, o país oferece excelentes oportunidades para quem quer recomeçar.</p>

      <h2>Por que escolher a Polônia?</h2>
      <p>A Polônia apresenta várias vantagens competitivas para brasileiros:</p>
      <ul>
        <li><strong>Custo de vida:</strong> 40-50% menor que países da Europa Ocidental</li>
        <li><strong>Economia:</strong> Estável e em crescimento constante há 30 anos</li>
        <li><strong>Mercado de trabalho:</strong> Grande demanda por profissionais de TI e engenharia</li>
        <li><strong>Comunidade:</strong> Comunidade brasileira estabelecida e ativa</li>
        <li><strong>Processo migratório:</strong> Relativamente simples comparado a outros países da UE</li>
      </ul>

      <h2>Custo de Vida Real</h2>
      <p>O custo de vida mensal para uma pessoa solteira em Varsóvia é de aproximadamente:</p>
      <ul>
        <li>Aluguel (1 quarto, centro): 2.500 PLN</li>
        <li>Alimentação: 800 PLN</li>
        <li>Transporte público: 150 PLN</li>
        <li>Utilidades (luz, água, internet): 300 PLN</li>
        <li><strong>Total: ~3.750 PLN (aproximadamente R$ 5.200)</strong></li>
      </ul>
      <p><em>Valores estimados com base em dados agregados de 2026. Podem variar por cidade e estilo de vida.</em></p>

      <h2>Vistos e Imigração</h2>
      <p>As principais rotas migratórias para brasileiros são:</p>
      <ul>
        <li><strong>Work Visa (Type D):</strong> Para quem tem oferta de emprego de empresa polonesa</li>
        <li><strong>Student Visa:</strong> Para estudantes de graduação ou pós-graduação</li>
        <li><strong>Business Visa:</strong> Para empreendedores e freelancers</li>
        <li><strong>Reunificação familiar:</strong> Para cônjuges e dependentes</li>
      </ul>
      <p><strong>Importante:</strong> Nenhuma rota garante aprovação. Consulte sempre os requisitos atualizados na fonte oficial.</p>

      <h2>Melhores Cidades para Brasileiros</h2>
      <ul>
        <li><strong>Varsóvia:</strong> Capital, centro econômico e mais oportunidades de emprego</li>
        <li><strong>Cracóvia:</strong> Cidade histórica, cultural e com ótima qualidade de vida</li>
        <li><strong>Wrocław:</strong> Hub de tecnologia em crescimento</li>
        <li><strong>Gdańsk:</strong> Cidade costeira com clima mais ameno</li>
      </ul>

      <h2>Próximos Passos</h2>
      <p>Se você está considerando a Polônia como destino, recomendamos:</p>
      <ol>
        <li>Fazer uma análise completa do seu perfil no GlobalMove</li>
        <li>Calcular o capital necessário para sua situação familiar</li>
        <li>Pesquisar oportunidades de emprego na sua área</li>
        <li>Consultar a embaixada polonesa sobre requisitos atualizados</li>
      </ol>
    `,
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <article className="container mx-auto px-4 max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center text-gray-400 hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para o blog
        </Link>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8 border border-surface-secondary">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[300px] md:h-[450px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent text-background text-xs font-bold rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-300">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('pt-BR')}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-300">
                <Clock className="h-4 w-4" />
                {post.readTime} de leitura
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white max-w-3xl">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Content */}
          <div>
            <div className="glass p-6 md:p-10 rounded-xl">
              <div
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* In-Article Ad */}
              <AdInArticle slot="1000000004" />

              {/* Sources */}
              <div className="mt-8 pt-8 border-t border-surface-secondary">
                <h3 className="text-white font-semibold mb-3">📚 Fontes</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Polish Ministry of Foreign Affairs — gov.pl</li>
                  <li>• Dados agregados de custo de vida (estimados)</li>
                </ul>
                <p className="text-gray-500 text-xs mt-4">
                  Última atualização: {new Date(post.date).toLocaleDateString('pt-BR')} · 
                  Este conteúdo é informativo e não constitui aconselhamento jurídico ou migratório.
                </p>
              </div>

              {/* Share */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-gray-400 text-sm">Compartilhar:</span>
                <button className="p-2 bg-surface-secondary rounded-lg hover:bg-accent/20 transition-colors">
                  <Share2 className="h-4 w-4 text-gray-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Sticky Ad */}
            <div className="lg:sticky lg:top-24 space-y-6">
              <AdBanner slot="1000000005" format="rectangle" />

              {/* CTA Card */}
              <div className="glass p-6 rounded-xl">
                <span className="text-3xl mb-3 block">🎯</span>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Pronto para planejar?
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Faça sua análise personalizada e descubra se a Polônia é viável para você.
                </p>
                <Link
                  to="/onboarding"
                  className="block w-full text-center px-4 py-2.5 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Começar análise gratuita
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}