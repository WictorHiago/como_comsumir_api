# 🚀 Guia de Deploy no Vercel

Este guia explica como fazer o deploy da API no Vercel sem modificar o projeto original.

## 📋 Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. [Vercel CLI](https://vercel.com/cli) instalado (opcional, mas recomendado)
3. Git instalado (para conectar com GitHub/GitLab/Bitbucket)

---

## 🔧 Configuração Necessária

### 1. Arquivos Criados

Foram criados os seguintes arquivos de configuração:

- **`vercel.json`** - Configuração do Vercel
- **`api/index.js`** - Wrapper para o Vercel (não modifica o projeto original)

### 2. Estrutura de Arquivos

```
api-ecommerce/
├── api/
│   └── index.js          # Entry point para o Vercel
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── database.json
│   └── server.js         # Projeto original (não modificado)
├── vercel.json           # Configuração do Vercel
└── package.json
```

---

## 📝 Variáveis de Ambiente no Vercel

### Configuração via Dashboard do Vercel

1. Acesse o [Dashboard do Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione as seguintes variáveis:

```
BASE_URL=https://seu-projeto.vercel.app
NODE_ENV=production
```

**⚠️ Importante:** O `BASE_URL` será gerado automaticamente pelo Vercel após o primeiro deploy. Você pode atualizá-lo depois.

### Configuração via CLI

```bash
vercel env add BASE_URL
# Digite: https://seu-projeto.vercel.app

vercel env add NODE_ENV
# Digite: production
```

---

## 🚀 Métodos de Deploy

### Método 1: Deploy via Dashboard (Recomendado para Iniciantes)

1. **Conecte seu repositório:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em **Add New Project**
   - Conecte seu repositório do GitHub/GitLab/Bitbucket
   - Selecione o repositório `api-ecommerce`

2. **Configure o projeto:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (raiz do projeto)
   - **Build Command:** (deixe vazio)
   - **Output Directory:** (deixe vazio)
   - **Install Command:** `npm install`

3. **Adicione variáveis de ambiente:**
   - Clique em **Environment Variables**
   - Adicione `BASE_URL` (será atualizado após o primeiro deploy)
   - Adicione `NODE_ENV=production`

4. **Faça o deploy:**
   - Clique em **Deploy**
   - Aguarde o processo concluir

### Método 2: Deploy via CLI

1. **Instale o Vercel CLI:**
```bash
npm install -g vercel
```

2. **Faça login:**
```bash
vercel login
```

3. **Navegue até a pasta do projeto:**
```bash
cd api-ecommerce
```

4. **Faça o deploy:**
```bash
vercel
```

5. **Siga as instruções:**
   - Selecione o escopo (sua conta ou organização)
   - Confirme o nome do projeto
   - Confirme as configurações

6. **Para produção:**
```bash
vercel --prod
```

---

## 🔍 Verificando o Deploy

Após o deploy, você receberá uma URL como:
```
https://api-ecommerce-xxxxx.vercel.app
```

### Teste os Endpoints:

```bash
# Rota raiz
curl https://seu-projeto.vercel.app/

# Listar produtos
curl https://seu-projeto.vercel.app/api/v1/product

# Buscar produto por ID
curl https://seu-projeto.vercel.app/api/v1/product/f4b9e8b3-1c4f-4f7a-915d-6a3a1bbad876

# Listar categorias
curl https://seu-projeto.vercel.app/api/v1/category
```

---

## ⚙️ Configurações Importantes

### 1. Arquivo `database.json`

O arquivo `src/database.json` será incluído no deploy automaticamente. Certifique-se de que ele está commitado no repositório.

### 2. Limites do Vercel

- **Free Tier:**
  - 100GB de bandwidth por mês
  - Funções serverless com timeout de 10 segundos
  - Sem limite de requisições

- **Pro Tier:**
  - Timeout de 60 segundos
  - Mais recursos disponíveis

### 3. Cold Start

Na primeira requisição após um período de inatividade, pode haver um "cold start" (inicialização mais lenta). Isso é normal em funções serverless.

---

## 🔄 Atualizações Futuras

### Via Dashboard:
1. Faça push das alterações para o repositório
2. O Vercel detecta automaticamente e faz redeploy

### Via CLI:
```bash
vercel --prod
```

---

## 🐛 Troubleshooting

### Problema: Erro 404 nas rotas

**Solução:** Verifique se o arquivo `vercel.json` está configurado corretamente e se todas as rotas estão sendo capturadas.

### Problema: Variáveis de ambiente não funcionam

**Solução:** 
1. Verifique se as variáveis estão configuradas no dashboard do Vercel
2. Certifique-se de que está usando `process.env.NOME_VARIAVEL`
3. Faça um novo deploy após adicionar variáveis

### Problema: Arquivo `database.json` não encontrado

**Solução:** 
1. Verifique se o arquivo está commitado no Git
2. Verifique o caminho relativo no código (`../database.json`)

### Problema: Timeout nas requisições

**Solução:** 
- Free tier tem limite de 10 segundos
- Considere otimizar o código ou fazer upgrade para Pro

---

## 📚 Recursos Adicionais

- [Documentação do Vercel](https://vercel.com/docs)
- [Guia de Deploy de APIs Node.js](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Variáveis de Ambiente no Vercel](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Checklist de Deploy

- [ ] Arquivo `vercel.json` criado
- [ ] Arquivo `api/index.js` criado
- [ ] Variáveis de ambiente configuradas
- [ ] Arquivo `database.json` commitado
- [ ] Repositório conectado ao Vercel
- [ ] Deploy realizado com sucesso
- [ ] Endpoints testados
- [ ] `BASE_URL` atualizado com a URL do Vercel

---

**Boa sorte com seu deploy! 🚀**

