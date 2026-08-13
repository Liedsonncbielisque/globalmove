# 🚀 Guia Rápido de Início

## Instalação em 5 Minutos

### 1. Clone o Repositório

```bash
git clone https://github.com/Liedsonncbielisque/globalmove.git
cd globalmove
```

### 2. Configure as Variáveis de Ambiente

```bash
cp .env.example backend/.env
```

Edite `backend/.env` com suas credenciais do Supabase:

```env
SUPABASE_URL=https://npqbzmvsioghwalsnnqp.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_ixpZP6KVBS8-_4daWjThvA_f8qcj-oq
SUPABASE_SECRET_KEY=sb_secret_SUA_SECRET_KEY_AQUI
DATABASE_URL=postgresql://postgres:SUA_SENHA@db.npqbzmvsioghwalsnnqp.supabase.co:5432/postgres
```

### 3. Instale as Dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Configure o Banco de Dados

```bash
cd backend

# Gerar Prisma Client
npx prisma generate

# Aplicar schema
npx prisma db push

# Seed database
npx prisma db seed
```

### 5. Inicie os Servidores

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### 6. Acesse

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **API Docs**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

## Comandos Úteis

### Backend

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Testes
npm test

# Lint
npm run lint

# Prisma
npx prisma studio  # Interface visual do banco
npx prisma migrate dev  # Criar migration
npx prisma db seed  # Seed database
```

### Frontend

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

## Estrutura do Projeto

```
globalmove/
├── frontend/          # React + TypeScript + Vite
├── backend/           # Node.js + TypeScript + Express
├── database/          # Migrations SQL
├── docs/              # Documentação
├── docker/            # Dockerfiles
└── .github/           # CI/CD workflows
```

## Troubleshooting

### Erro de conexão com Supabase

- Verifique se as credenciais estão corretas no `.env`
- Teste a conexão: `curl http://localhost:3001/health`

### Erro ao rodar migrations

- Certifique-se de que a `DATABASE_URL` está correta
- Verifique se o banco está acessível

### Frontend não carrega

- Limpe o cache: `rm -rf node_modules && npm install`
- Verifique se o backend está rodando

## Próximos Passos

1. ✅ Explorar a landing page
2. ✅ Fazer o onboarding
3. ✅ Ver o dashboard
4. ✅ Explorar destinos
5. ✅ Testar o simulador
6. ✅ Conversar com a IA

---

**Dúvidas?** Abra uma [issue](https://github.com/Liedsonncbielisque/globalmove/issues)