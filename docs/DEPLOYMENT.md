# 🚀 Deployment Guide

## Pré-requisitos

- Docker e Docker Compose instalados
- Conta no Supabase
- Domínio configurado (opcional)
- SSL/TLS certificado (produção)

## Ambientes

### Development

```bash
# Clone o repositório
git clone https://github.com/Liedsonncbielisque/globalmove.git
cd globalmove

# Configure variáveis de ambiente
cp .env.example .env

# Edite o .env com suas credenciais
nano .env

# Inicie com Docker Compose
docker-compose up -d

# Ou inicie manualmente
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

### Production

#### Opção 1: Docker Compose

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

#### Opção 2: Kubernetes

```bash
# Apply configurations
kubectl apply -f k8s/

# Check status
kubectl get pods
kubectl get services
```

#### Opção 3: Vercel + Railway

**Frontend (Vercel):**
```bash
cd frontend
vercel --prod
```

**Backend (Railway):**
```bash
cd backend
railway up
```

## Variáveis de Ambiente

### Backend

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_SECRET_KEY=sb_secret_...
JWT_SECRET=your-secret-key
REDIS_URL=redis://...
```

### Frontend

```env
VITE_API_URL=https://api.globalmove.com.br
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
VITE_ADSENSE_CLIENT_ID=ca-pub-...
```

## Database Migrations

```bash
# Run migrations
cd backend
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

## SSL/TLS

### Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d globalmove.com.br -d www.globalmove.com.br

# Auto-renewal
sudo certbot renew --dry-run
```

## Monitoring

### Health Checks

```bash
# Backend
curl https://api.globalmove.com.br/health

# Frontend
curl https://globalmove.com.br
```

### Logs

```bash
# Docker Compose
docker-compose logs -f backend
docker-compose logs -f frontend

# Kubernetes
kubectl logs -f deployment/backend
kubectl logs -f deployment/frontend
```

## Backup

### Database

```bash
# Supabase automatic backups
# Configured in Supabase dashboard

# Manual backup
pg_dump $DATABASE_URL > backup.sql
```

### Files

```bash
# Backup uploads
tar -czf uploads-backup.tar.gz uploads/
```

## Rollback

```bash
# Docker Compose
docker-compose down
git checkout previous-version
docker-compose up -d

# Kubernetes
kubectl rollout undo deployment/backend
kubectl rollout undo deployment/frontend
```

## Scaling

### Horizontal Scaling

```bash
# Docker Compose
docker-compose up -d --scale backend=3

# Kubernetes
kubectl scale deployment/backend --replicas=3
```

### Vertical Scaling

Edit `docker-compose.yml`:
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
```

## Troubleshooting

### Backend não inicia

```bash
# Check logs
docker-compose logs backend

# Check environment variables
docker-compose exec backend env

# Restart service
docker-compose restart backend
```

### Database connection error

```bash
# Test connection
psql $DATABASE_URL

# Check Supabase status
curl https://status.supabase.com
```

### Frontend build error

```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

## Performance

### CDN

Configure Cloudflare ou similar para assets estáticos.

### Caching

```nginx
# Nginx configuration
location /static/ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

## Security

### Firewall

```bash
# Allow only necessary ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Updates

```bash
# Update dependencies
npm audit fix

# Update Docker images
docker-compose pull
docker-compose up -d
```

---

**GlobalMove** — Deploy simplificado.