# 🚀 Deploy com Vercel + Railway

## Arquitetura Recomendada (100% Open Source e Gratuita)

```
Frontend (Vercel) → Backend (Railway) → Database (Supabase)
```

## Por que essa stack?

✅ **100% Open Source**
✅ **Gratuita para começar**
✅ **Deploy em 5 minutos**
✅ **Escalável**
✅ **SSL automático**
✅ **CDN global**

---

## 📦 PASSO 1: Deploy Frontend (Vercel)

### 1.1. Criar Conta
- Acesse: https://vercel.com
- Login com GitHub

### 1.2. Importar Projeto
1. **Add New** → **Project**
2. Selecione `globalmove`
3. Configure:
   - **Framework:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 1.3. Variáveis de Ambiente
```
VITE_API_URL=https://seu-backend.up.railway.app
VITE_SUPABASE_URL=https://npqbzmvsioghwalsnnqp.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_ixpZP6KVBS8-_4daWjThvA_f8qcj-oq
```

### 1.4. Deploy
- Clique em **Deploy**
- Aguarde 2-3 minutos
- URL: `https://globalmove.vercel.app`

---

## 🚂 PASSO 2: Deploy Backend (Railway)

### 2.1. Criar Conta
- Acesse: https://railway.app
- Login com GitHub

### 2.2. Criar Projeto
1. **New Project**
2. **Deploy from GitHub repo**
3. Selecione `globalmove`
4. Selecione pasta `backend`

### 2.3. Variáveis de Ambiente
```env
NODE_ENV=production
PORT=3001
SUPABASE_URL=https://npqbzmvsioghwalsnnqp.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_ixpZP6KVBS8-_4daWjThvA_f8qcj-oq
SUPABASE_SECRET_KEY=sb_secret_SUA_SECRET_KEY_AQUI
DATABASE_URL=postgresql://postgres:SENHA@db.npqbzmvsioghwalsnnqp.supabase.co:5432/postgres
JWT_SECRET=globalmove_super_secret_key_2026_production
FRONTEND_URL=https://globalmove.vercel.app
```

### 2.4. Deploy
- Railway faz deploy automático
- Copie a URL gerada

### 2.5. Atualizar Frontend
Volte na Vercel e atualize `VITE_API_URL` com a URL do Railway

---

## 🎯 URLs Finais

- **Frontend:** https://globalmove.vercel.app
- **Backend:** https://globalmove-backend.up.railway.app
- **API Health:** https://globalmove-backend.up.railway.app/health

---

## 💰 Custos

### Gratuito (Para Começar)
- Vercel: 100GB bandwidth/mês
- Railway: 500 horas/mês
- Supabase: 500MB database

### Pago (Quando Crescer)
- Vercel Pro: $20/mês
- Railway Pro: $5-20/mês
- Supabase Pro: $25/mês

---

## 🔄 Alternativas Open Source

| Frontend | Backend | Database |
|---|---|---|
| Netlify | Render | Supabase |
| Cloudflare Pages | Cloudflare Workers | PlanetScale |
| GitHub Pages | Heroku | ElephantSQL |

---

## ✅ Checklist de Deploy

### Vercel (Frontend)
- [ ] Criar conta
- [ ] Importar repositório
- [ ] Configurar variáveis
- [ ] Deploy

### Railway (Backend)
- [ ] Criar conta
- [ ] Conectar GitHub
- [ ] Configurar variáveis
- [ ] Deploy
- [ ] Copiar URL
- [ ] Atualizar VITE_API_URL na Vercel

### Testes
- [ ] Acessar frontend
- [ ] Testar API health check
- [ ] Fazer onboarding
- [ ] Verificar dashboard

---

## 🆘 Troubleshooting

### Frontend não carrega
- Verifique se `VITE_API_URL` está correto
- Limpe cache: `npm run build` novamente

### Backend não responde
- Verifique logs no Railway
- Teste health check: `curl https://seu-backend.up.railway.app/health`

### Erro de CORS
- Verifique se `FRONTEND_URL` no backend está correto
- Deve ser a URL da Vercel

---

**GlobalMove** — Deploy simplificado com Vercel + Railway! 🚀