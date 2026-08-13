# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-08-13

### Added - Implementação Inicial Completa

#### Frontend
- ✅ Landing page premium com hero, stats, features e CTA
- ✅ Onboarding completo em 5 etapas (perfil, família, objetivo, finanças, prazo)
- ✅ Dashboard funcional com evolução de capital e gráficos
- ✅ Simulador "E se?" com slider interativo
- ✅ Planejador de metas com progresso visual
- ✅ Lista de países com busca e dados da API
- ✅ Página de detalhes do país (custos, vistos, cidades)
- ✅ Comparador de até 4 destinos lado a lado
- ✅ Sistema de autenticação (Login/Registro)
- ✅ Blog com 6 artigos para SEO
- ✅ GlobalMove AI Assistant (interface de chat)
- ✅ Componentes AdSense (AdBanner, AdInFeed, AdInArticle)
- ✅ Design System completo (dark mode, glassmorphism, paleta GlobalMove)
- ✅ SEO otimizado (meta tags, OG, Twitter Cards, sitemap, robots.txt)
- ✅ Estados de UI (loading, skeleton, empty, error, retry)
- ✅ Responsivo mobile-first

#### Backend
- ✅ API REST com Express + TypeScript
- ✅ Motor financeiro completo:
  - Cálculo de viabilidade (viável/próximo/distante)
  - Projeção de capital (conservador/realista/agressivo)
  - Simulador de cenários
  - Conversão de moedas
- ✅ Sistema de ranking (GlobalMove Score):
  - Pesos configuráveis por objetivo
  - Explicações detalhadas (reasons/warnings)
  - Breakdown por categoria
- ✅ Autenticação JWT (register, login, me)
- ✅ CRUD de países com cache Redis
- ✅ Rotas de vistos com análise de compatibilidade
- ✅ Sistema de alertas (câmbio, metas, vistos)
- ✅ GlobalMove AI (processamento de perguntas)
- ✅ Sistema de favoritos
- ✅ Painel administrativo (stats, CRUD países)
- ✅ Serviço de câmbio com fallback em 3 níveis
- ✅ Cache Redis com graceful degradation
- ✅ Segurança (Helmet, CORS, Rate Limiting, bcrypt)
- ✅ Logs estruturados com Winston
- ✅ Tratamento de erros centralizado

#### Banco de Dados
- ✅ Schema Prisma completo (12 modelos)
- ✅ Seed com:
  - 8 países (Polônia, Portugal, Espanha, Irlanda, Canadá, Chile, Alemanha, Austrália)
  - 10 cidades principais
  - 9 rotas de visto oficiais
  - Dados de custo de vida
- ✅ Tabela de alertas
- ✅ Integração Supabase (publishable + secret keys)

#### Infraestrutura
- ✅ Dockerfiles (frontend + backend)
- ✅ Docker Compose com Redis
- ✅ Nginx com gzip e cache
- ✅ GitHub Actions (CI + Deploy)

#### Documentação
- ✅ README profissional
- ✅ ARCHITECTURE.md (arquitetura detalhada)
- ✅ API.md (documentação completa da API)
- ✅ DEPLOYMENT.md (guia de deploy)
- ✅ CONTRIBUTING.md (guia de contribuição)
- ✅ CHANGELOG.md
- ✅ LICENSE (MIT)

#### Testes
- ✅ Testes do motor financeiro (12 casos)
- ✅ Testes do sistema de ranking

### API Endpoints

#### Auth
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário autenticado

#### Countries
- `GET /api/countries` - Listar países (com cache)
- `GET /api/countries/:id` - Detalhes do país

#### Financial
- `POST /api/financial/viability` - Calcular viabilidade
- `POST /api/financial/monthly-cost` - Calcular custo mensal
- `POST /api/financial/simulate` - Simular cenários
- `POST /api/financial/convert` - Converter moeda
- `GET /api/financial/exchange-rate/:from/:to` - Taxa de câmbio

#### Visas
- `GET /api/visas/country/:countryId` - Vistos por país
- `POST /api/visas/compatibility` - Verificar compatibilidade

#### Ranking
- `POST /api/ranking/calculate` - Calcular ranking
- `GET /api/ranking/weights/:objective` - Pesos por objetivo

#### Alerts
- `GET /api/alerts` - Listar alertas do usuário
- `PUT /api/alerts/:id/read` - Marcar como lido
- `PUT /api/alerts/read-all` - Marcar todos como lidos

#### AI
- `POST /api/ai/ask` - Perguntar ao GlobalMove AI

#### Favorites
- `GET /api/favorites` - Listar favoritos
- `POST /api/favorites` - Adicionar favorito
- `DELETE /api/favorites/:id` - Remover favorito

#### Admin
- `GET /api/admin/stats` - Estatísticas do sistema
- `POST /api/admin/countries` - Adicionar país
- `PUT /api/admin/countries/:id` - Atualizar país
- `PATCH /api/admin/countries/:id/toggle` - Ativar/desativar país

### Estatísticas
- **60+ arquivos**
- **10.000+ linhas de código**
- **20+ componentes React**
- **15+ páginas**
- **25+ endpoints de API**
- **12 modelos de banco de dados**
- **8 países com dados completos**
- **9 rotas de visto oficiais**
- **6 artigos de blog**

### Próximos Passos
- [ ] Deploy em produção
- [ ] Configurar domínio personalizado
- [ ] Ativar Google AdSense
- [ ] Implementar notificações push
- [ ] Adicionar mais países
- [ ] Integração com mais APIs externas
- [ ] App mobile (React Native)
- [ ] Marketplace de serviços

---

**GlobalMove** — Transforme o sonho de morar fora em um plano. 🌎✈️💰