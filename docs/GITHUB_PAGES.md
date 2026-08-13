# 🚀 Deploy no GitHub Pages

## Configuração Rápida

### 1. Habilitar GitHub Pages

1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Salve

### 2. Configurar Secrets

Vá em **Settings** → **Secrets and variables** → **Actions** e adicione:

```
VITE_API_URL=https://seu-backend.railway.app
VITE_SUPABASE_URL=https://npqbzmvsioghwalsnnqp.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_ixpZP6KVBS8-_4daWjThvA_f8qcj-oq
VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

### 3. Fazer Push

```bash
git add .
git commit -m "feat: configure GitHub Pages deploy"
git push origin main
```

### 4. Aguardar Deploy

- Vá em **Actions** e aguarde o workflow completar
- Acesse: `https://Liedsonncbielisque.github.io/globalmove/`

## ⚠️ Importante

O GitHub Pages hospeda **apenas o frontend**. Para o backend, use:

- **Railway** (recomendado): https://railway.app
- **Render**: https://render.com
- **Vercel**: https://vercel.com

## 📝 Notas

- O deploy é automático a cada push na branch `main`
- O site estará disponível em: `https://SEU_USUARIO.github.io/globalmove/`
- O backend precisa estar hospedado separadamente

---

**GlobalMove** — Deploy simplificado no GitHub Pages! 🚀