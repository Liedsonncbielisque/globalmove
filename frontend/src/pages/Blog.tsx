import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    slug: 'como-morar-na-polonia-2026',
    title: 'Como Morar na Polônia em 2026: Guia Completo',
    excerpt: 'Descubra os requisitos, custos e melhores cidades para brasileiros que querem morar na Polônia.',
    date: '2026-08-10',
    readTime: '8 min',
    category: 'Guias',
    image: '🇵🇱',
  },
  {
    id: 2,
    slug: 'visto-d7-portugal-guia',
    title: 'Visto D7 Portugal: Tudo que Você Precisa Saber',
    excerpt: 'Guia completo sobre o visto D7 para renda passiva em Portugal, incluindo requisitos e processo.',
    date: '2026-08-08',
    readTime: '10 min',
    category: 'Vistos',
    image: '🇵🇹',
  },
  {
    id: 3,
    slug: 'custo-de-vida-europa-2026',
    title: 'Custo de Vida na Europa: Comparação 2026',
    excerpt: 'Compare o custo de vida nos principais países europeus e descubra onde seu dinheiro rende mais.',
    date: '2026-08-05',
    readTime: '12 min',
    category: 'Custos',
    image: '💰',
  },
  {
    id: 4,
    slug: 'trabalhar-na-irlanda-ti',
    title: 'Trabalhar na Irlanda com TI: Guia para Brasileiros',
    excerpt: 'A Irlanda é o hub tech da Europa. Saiba como conseguir emprego em tecnologia e visto de trabalho.',
    date: '2026-08-01',
    readTime: '9 min',
    category: 'Carreira',
    image: '🇮🇪',
  },
  {
    id: 5,
    slug: 'planejamento-financeiro-imigracao',
    title: 'Planejamento Financeiro para Imigração: Passo a Passo',
    excerpt: 'Aprenda a calcular quanto você precisa economizar e em quanto tempo conseguirá se mudar.',
    date: '2026-07-28',
    readTime: '15 min',
    category: 'Finanças',
    image: '📊',
  },
  {
    id: 6,
    slug: 'nomade-digital-espanha',
    title: 'Visto de Nômade Digital na Espanha: Vale a Pena?',
    excerpt: 'Análise completa do visto de nômade digital espanhol, requisitos e comparativo com outros países.',
    date: '2026-07-25',
    readTime: '7 min',
    category: 'Vistos',
    image: '🇪🇸',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog GlobalMove
          </h1>
          <p className="text-xl text-gray-400">
            Guias, análises e dicas sobre imigração, custos de vida e planejamento financeiro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="glass rounded-lg overflow-hidden hover:border-accent/50 transition-all group"
            >
              <div className="p-6">
                <div className="text-6xl mb-4">{post.image}</div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-400 text-sm mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-accent text-sm font-medium">
                  Ler mais
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}