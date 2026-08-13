import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { AdInArticle } from '@/components/ads/AdInArticle';

export default function BlogPost() {
  const { slug } = useParams();

  // Em produção, buscar do backend
  const post = {
    title: 'Como Morar na Polônia em 2026: Guia Completo',
    date: '2026-08-10',
    readTime: '8 min',
    category: 'Guias',
    content: `
      <p>A Polônia se tornou um dos destinos mais procurados por brasileiros que desejam morar na Europa. Com custo de vida acessível, economia em crescimento e processo migratório relativamente simples, o país oferece excelentes oportunidades.</p>

      <h2>Por que escolher a Polônia?</h2>
      <p>A Polônia apresenta várias vantagens para brasileiros:</p>
      <ul>
        <li>Custo de vida 40-50% menor que países da Europa Ocidental</li>
        <li>Economia estável e em crescimento</li>
        <li>Grande demanda por profissionais de TI</li>
        <li>Comunidade brasileira estabelecida</li>
        <li>Processo de visto relativamente simples</li>
      </ul>

      <h2>Custo de Vida</h2>
      <p>O custo de vida mensal para uma pessoa solteira em Varsóvia é de aproximadamente:</p>
      <ul>
        <li>Aluguel (1 quarto): 2.500 PLN</li>
        <li>Alimentação: 800 PLN</li>
        <li>Transporte: 150 PLN</li>
        <li>Utilidades: 300 PLN</li>
        <li>Total: ~3.750 PLN (~R$ 5.200)</li>
      </ul>

      <h2>Vistos e Imigração</h2>
      <p>As principais rotas migratórias para brasileiros são:</p>
      <ul>
        <li><strong>Work Visa (Type D):</strong> Para quem tem oferta de emprego</li>
        <li><strong>Student Visa:</strong> Para estudantes de graduação ou pós</li>
        <li><strong>Business Visa:</strong> Para empreendedores</li>
      </ul>

      <h2>Melhores Cidades</h2>
      <p>As cidades mais procuradas são:</p>
      <ul>
        <li><strong>Varsóvia:</strong> Capital e centro econômico</li>
        <li><strong>Cracóvia:</strong> Cidade histórica e cultural</li>
        <li><strong>Wrocław:</strong> Hub de tecnologia</li>
        <li><strong>Gdańsk:</strong> Cidade costeira</li>
      </ul>

      <h2>Próximos Passos</h2>
      <p>Se você está considerando a Polônia, recomendamos:</p>
      <ol>
        <li>Fazer uma análise completa do seu perfil no GlobalMove</li>
        <li>Calcular o capital necessário</li>
        <li>Pesquisar oportunidades de emprego na sua área</li>
        <li>Consultar a embaixada polonesa sobre requisitos atualizados</li>
      </ol>
    `,
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <article className="container mx-auto px-4 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-accent mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para o blog
        </Link>

        <div className="glass p-8 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded">
              {post.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString('pt-BR')}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime} de leitura
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>

          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* AdSense */}
          <AdInArticle slot="1234567890" />

          <div className="mt-8 pt-8 border-t border-surface-secondary">
            <p className="text-gray-400 text-sm">
              <strong>Fontes:</strong> Dados baseados em informações oficiais do governo polonês e estimativas de custo de vida agregadas.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Última atualização: {new Date(post.date).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}