# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o GlobalMove!

## Como Contribuir

### 1. Fork e Clone

```bash
git clone https://github.com/Liedsonncbielisque/globalmove.git
cd globalmove
```

### 2. Crie uma Branch

```bash
git checkout -b feature/minha-feature
```

**Convenção de branches:**
- `feature/` — Novas funcionalidades
- `fix/` — Correções de bugs
- `docs/` — Documentação
- `refactor/` — Refatoração

### 3. Faça suas Mudanças

- Siga o style guide (ESLint + Prettier)
- Adicione testes para novas funcionalidades
- Atualize documentação quando necessário

### 4. Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: adiciona sistema de alertas"
git commit -m "fix: corrige cálculo de viabilidade"
git commit -m "docs: atualiza README"
```

### 5. Push e Pull Request

```bash
git push origin feature/minha-feature
```

Abra um Pull Request para `develop` com:
- Descrição clara das mudanças
- Screenshots (se UI)
- Referência a issues relacionadas

## Padrões de Código

### TypeScript
- Strict mode ativado
- Tipos explícitos (evite `any`)
- Interfaces para objetos complexos

### React
- Componentes funcionais
- Hooks customizados para lógica reutilizável
- Props tipadas

### Backend
- Controllers magros (lógica nos services)
- Validação com Zod
- Tratamento de erros centralizado

## Testes

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

## Reportar Bugs

Abra uma [issue](https://github.com/Liedsonncbielisque/globalmove/issues) com:
- Descrição do bug
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)

## Sugerir Features

Abra uma [issue](https://github.com/Liedsonncbielisque/globalmove/issues) com tag `enhancement`.

---

Obrigado por contribuir! 🌎