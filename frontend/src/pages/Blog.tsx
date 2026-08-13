import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, TrendingUp } from 'lucide-react';
import { AdBanner } from '@/components/ads/AdBanner';
import { AdInFeed } from '@/components/ads/AdInFeed';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'como-morar-na-polonia-2026',
    title: 'Como Morar na Polônia em 2026: Guia Completo para Brasileiros',
    excerpt: 'Descubra os requisitos, custos reais e as melhores cidades para brasileiros que querem recomeçar na Polônia.',
    date: '2026-08-10',
    readTime: '8 min',
    category: 'Guias',
    image: 'https://images.unsplash.com/photo-1607427293702-036933bbf746?w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    slug: 'visto-d7-portugal-guia',
    title: 'Visto D7 Portugal: Tudo que Você Precisa Saber',
    excerpt: 'Guia completo sobre o visto D7 para renda passiva em Portugal, incluindo requisitos atualizados e processo passo a passo.',
    date: '2026-08-08',
    readTime: '10 min',
    category: 'Vistos',
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80',
  },
  {
    id: 3,
    slug: 'custo-de-vida-europa-2026',
    title: 'Custo de Vida na Europa: Comparação Completa 2026',
    excerpt: 'Compare o custo de vida nos principais países europeus e descubra onde seu dinheiro rende mais.',
    date: '2026-08-05',
    readTime: '12 min',
    category: 'Custos',
    image: 'https://images.unsplash.com/photo-1483356256511-b48749959172?w=800&q=80',
  },
  {
    id: 4,
    slug: 'trabalhar-na-irlanda-ti',
    title: 'Trabalhar na Irlanda com TI: O Hub Tech da Europa',
    excerpt: 'A Irlanda concentra as maiores empresas de tecnologia do mundo. Saiba como conseguir emprego e visto de trabalho.',
    date: '2026-08-01',
    readTime: '9 min',
    category: 'Carreira',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&q=80',
  },
  {
    id: 5,
    slug: 'planejamento-financeiro-imigracao',
    title: 'Planejamento Financeiro para Imigração: Passo a Passo',
    excerpt: 'Aprenda a calcular exatamente quanto você precisa economizar e em quanto tempo conseguirá se mudar.',
    date: '2026-07-28',
    readTime: '15 min',
    category: 'Finanças',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  },
  {
    id: 6,
    slug: 'nomade-digital-espanha',
    title: 'Visto de Nômade Digital na Espanha: Vale a Pena?',
    excerpt: 'Análise completa do visto de nômade digital espanhol, requisitos, impostos e comparativo com Portugal.',
    date: '2026-07-25',
    readTime: '7 min',
    category: 'Vistos',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80',
  },
  {
    id: 7,
    slug: 'canada-express-entry-2026',
    title: 'Express Entry Canadá: Como Funciona o Sistema de Pontos',
    excerpt: 'Entenda o CRS, como aumentar sua pontuação e as estratégias para receber o convite de residência permanente.',
    date: '2026-07-20',
    readTime: '11 min',
    category: 'Vistos',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80',
  },
  {
    id: 8,
    slug: 'melhores-cidades-europa-custo-qualidade',
    title: 'As 10 Cidades Europeias com Melhor Custo-Qualidade',
    excerpt: 'Ranking das cidades onde você vive bem gastando pouco, com dados reais de aluguel, alimentação e transporte.',
    date: '2026-07-15',
    readTime: '14 min',
    category: 'Custos',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
  },
];

const categories = ['Todos', 'Guias', 'Vistos', 'Custos', 'Carreira', 'Finanças'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [search, setSearch] = useState('');

  const featured = blogPosts.find((p) => p.featured);
  const filtered = blogPosts.filter((p) => {
    const matchCategory = activeCategory === 'Todos' || p.category === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch && !p.featured;
  });

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Header */}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm mb-6">
            <TrendingUp className="h-4 w-4" />
            Conteúdo atualizado semanalmente
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Blog{' '}
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              GlobalMove
            </span>
          </h1>
          <p className="text-lg text-gray-400">
            Guias, análises e estratégias sobre imigração, custos de vida e planejamento financeiro
          </p>
        </div>

        {/* Search + Categories */}
        <div className="max-w-5xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="search"
              placeholder="Buscar artigos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-surface/50 backdrop-blur border border-surface-secondary rounded-xl text-white placeholder-gray-500 focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-accent text-background'
                    : 'bg-surface/50 text-gray-400 hover:text-white hover:bg-surface-secondary border border-surface-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featured && activeCategory === 'Todos' && !search && (
        <div className="container mx-auto px-4 mb-16">
          <Link
            to={`/blog/${featured.slug}`}
            className="group relative block max-w-6xl mx-auto rounded-2xl overflow-hidden border border-surface-secondary hover:border-accent/50 transition-all duration-500"
          >
            <div className="relative h-[400px] md:h-[500px]">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-accent text-background text-xs font-bold rounded-full">
                    DESTAQUE
                  </span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur text-white text-xs rounded-full">
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 max-w-2xl group-hover:text-accent transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-300 max-w-xl mb-4 hidden md:block">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(featured.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featured.readTime} de leitura
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Ad Banner Top */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-5xl mx-auto">
          <AdBanner slot="1000000001" format="horizontal" />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="glass p-12 rounded-xl text-center">
              <p className="text-gray-400 text-lg">
                Nenhum artigo encontrado{search && ` para "${search}"`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, index) => (
                <>
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group glass rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-background/80 backdrop-blur text-accent text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center text-accent text-sm font-medium">
                        Ler artigo
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>

                  {/* In-Feed Ad após cada 3 posts */}
                  {(index + 1) % 3 === 0 && index < filtered.length - 1 && (
                    <div key={`ad-${index}`} className="glass rounded-xl overflow-hidden flex items-center justify-center min-h-[300px]">
                      <AdInFeed slot="1000000002" />
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ad Banner Bottom */}
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-5xl mx-auto">
          <AdBanner slot="1000000003" format="horizontal" />
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-4xl mx-auto glass-strong rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-secondary/5" />
          <div className="relative">
            <span className="text-4xl mb-4 block">✈️</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Receba guias de imigração toda semana
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Junte-se a milhares de brasileiros planejando sua mudança internacional.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 bg-surface-secondary border border-surface-secondary rounded-lg text-white placeholder-gray-500 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}