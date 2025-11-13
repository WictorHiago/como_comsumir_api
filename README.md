# 🛒 API E-Commerce - Como Consumir API

> **Projeto Didático** - API REST com dados em JSON simulando um banco de dados

Uma API REST simples e didática desenvolvida em Node.js/Express que simula um sistema de e-commerce. Este projeto utiliza um arquivo JSON como banco de dados simulado, ideal para aprendizado e testes de consumo de APIs.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Como Executar](#-como-executar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Exemplos de Uso](#-exemplos-de-uso)
- [Estrutura de Dados](#-estrutura-de-dados)

---

## 🎯 Sobre o Projeto

Esta API foi desenvolvida com fins educacionais para demonstrar como criar e consumir uma API REST. O projeto simula um sistema de e-commerce básico, permitindo consultar produtos e categorias através de endpoints HTTP.

### Características

- ✅ API RESTful completa
- ✅ Dados armazenados em arquivo JSON (simulando banco de dados)
- ✅ Endpoints para produtos e categorias
- ✅ Filtros por ID e categoria
- ✅ Tratamento de erros
- ✅ CORS habilitado
- ✅ Segurança com Helmet

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web para Node.js
- **CORS** - Middleware para habilitar CORS
- **Helmet** - Middleware de segurança HTTP
- **dotenv** - Gerenciamento de variáveis de ambiente
- **Nodemon** - Hot reload para desenvolvimento

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)

---

## 🚀 Instalação

1. **Clone o repositório** (ou baixe os arquivos)

```bash
git clone <url-do-repositorio>
cd api-ecommerce
```

2. **Instale as dependências**

```bash
npm install
```

---

## ⚙️ Configuração

1. **Crie um arquivo `.env` na raiz do projeto** com as seguintes variáveis:

```env
PORT=3000
BASE_URL=http://localhost:3000
```

2. **Certifique-se de que o arquivo `src/database.json` existe** e contém os dados de produtos e categorias.

---

## ▶️ Como Executar

### Modo Desenvolvimento (com hot reload)

```bash
npm run dev
```

### Modo Produção

```bash
npm start
```

O servidor estará rodando em: `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
api-ecommerce/
├── src/
│   ├── controllers/
│   │   └── Controller.js      # Lógica dos controllers
│   ├── routes/
│   │   └── router.js          # Definição das rotas
│   ├── database.json          # Banco de dados simulado (JSON)
│   └── server.js              # Arquivo principal do servidor
├── .env                       # Variáveis de ambiente
├── package.json               # Dependências do projeto
└── README.md                  # Este arquivo
```

---

## 🔌 Endpoints da API

### Base URL

```
http://localhost:3000
```

### Rota Principal

#### `GET /`

Retorna informações sobre as rotas disponíveis na API.

**Request:**
```bash
GET http://localhost:3000/
```

**Response:**
```json
{
  "message": "URL's API",
  "data": [
    {
      "base_url": "http://localhost:3000",
      "json_database": "http://localhost:3000/api/v1/database"
    },
    [
      {
        "product": {
          "all": "http://localhost:3000/api/v1/product",
          "by_category": "http://localhost:3000/product/by_category/:id_category",
          "by_id": "http://localhost:3000/product/:id_product"
        },
        "category": {
          "all": "http://localhost:3000/api/v1/category",
          "by_id": "http://localhost:3000/api/v1/category/:id_category"
        }
      }
    ]
  ]
}
```

---

### 📦 Endpoints de Produtos

#### 1. Listar Todos os Produtos

**Endpoint:** `GET /api/v1/product`

**Request:**
```bash
GET http://localhost:3000/api/v1/product
```

**Response (200 OK):**
```json
{
  "message": "GET PRODUCT SUCCESS",
  "data": [
    {
      "id": "f4b9e8b3-1c4f-4f7a-915d-6a3a1bbad876",
      "product_name": "fone_de_ouvido_bluetooth",
      "description": "Fone sem fio com cancelamento de ruído e bateria de 20 horas.",
      "id_category": "b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e",
      "category_name": "eletronicos",
      "created_at": "2025-11-11T09:00:00Z",
      "updated_at": "2025-11-11T09:00:00Z"
    },
    {
      "id": "c3faaf51-08d1-43de-a44e-80b51af94f3e",
      "product_name": "camisa_estampada_unissex",
      "description": "Camisa 100% algodão com estampa moderna e confortável.",
      "id_category": "f1e9b77c-d8bb-45cd-913c-114c49f0e922",
      "category_name": "roupas",
      "created_at": "2025-11-11T09:10:00Z",
      "updated_at": "2025-11-12T08:30:00Z"
    }
    // ... mais produtos
  ]
}
```

**Response (500 Error):**
```json
{
  "message": "GET PRODUCT ERROR",
  "error": "Unknown error occurred while reading database."
}
```

---

#### 2. Buscar Produto por ID

**Endpoint:** `GET /api/v1/product/:id_product`

**Parâmetros:**
- `id_product` (string, obrigatório) - ID do produto

**Request:**
```bash
GET http://localhost:3000/api/v1/product/f4b9e8b3-1c4f-4f7a-915d-6a3a1bbad876
```

**Response (200 OK):**
```json
{
  "message": "GET PRODUCT BY ID SUCCESS",
  "data": {
    "id": "f4b9e8b3-1c4f-4f7a-915d-6a3a1bbad876",
    "product_name": "fone_de_ouvido_bluetooth",
    "description": "Fone sem fio com cancelamento de ruído e bateria de 20 horas.",
    "id_category": "b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e",
    "category_name": "eletronicos",
    "created_at": "2025-11-11T09:00:00Z",
    "updated_at": "2025-11-11T09:00:00Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "message": "f4b9e8b3-1c4f-4f7a-915d-6a3a1bbad876 - PRODUCT NOT FOUND",
  "data": []
}
```

**Response (500 Error):**
```json
{
  "message": "GET PRODUCT BY ID ERROR",
  "error": "Unknown error occurred while reading database."
}
```

---

#### 3. Buscar Produtos por Categoria

**Endpoint:** `GET /api/v1/product/by_category/:id_category`

**Parâmetros:**
- `id_category` (string, obrigatório) - ID da categoria

**Request:**
```bash
GET http://localhost:3000/api/v1/product/by_category/b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e
```

**Response (200 OK):**
```json
{
  "message": "GET PRODUCT BY CATEGORY SUCCESS",
  "data": [
    {
      "id": "f4b9e8b3-1c4f-4f7a-915d-6a3a1bbad876",
      "product_name": "fone_de_ouvido_bluetooth",
      "description": "Fone sem fio com cancelamento de ruído e bateria de 20 horas.",
      "id_category": "b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e",
      "category_name": "eletronicos",
      "created_at": "2025-11-11T09:00:00Z",
      "updated_at": "2025-11-11T09:00:00Z"
    },
    {
      "id": "e2d8c6fb-b9e8-4b61-9a2b-3bdf7ec9b95d",
      "product_name": "smartwatch_pro_5",
      "description": "Relógio inteligente com monitor de frequência cardíaca e GPS.",
      "id_category": "b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e",
      "category_name": "eletronicos",
      "created_at": "2025-11-11T09:30:00Z",
      "updated_at": "2025-11-11T09:30:00Z"
    }
  ]
}
```

**Response (404 Not Found - Categoria não existe):**
```json
{
  "message": "CATEGORY NOT FOUND",
  "data": []
}
```

**Response (204 No Content - Nenhum produto encontrado):**
```json
{
  "message": "PRODUCT BY CATEGORY NOT FOUND",
  "data": []
}
```

**Response (500 Error):**
```json
{
  "message": "GET PRODUCT BY CATEGORY ERROR",
  "error": "Unknown error occurred while reading database."
}
```

---

### 📂 Endpoints de Categorias

#### 1. Listar Todas as Categorias

**Endpoint:** `GET /api/v1/category`

**Request:**
```bash
GET http://localhost:3000/api/v1/category
```

**Response (200 OK):**
```json
{
  "message": "GET CATEGORY SUCCESS",
  "data": [
    {
      "id": "b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e",
      "category_name": "eletronicos",
      "created_at": "2025-11-10T12:00:00Z",
      "updated_at": "2025-11-10T12:00:00Z"
    },
    {
      "id": "a3e3a45d-9c5b-4f6e-8d71-28f7dc6e3d41",
      "category_name": "livros",
      "created_at": "2025-11-10T12:05:00Z",
      "updated_at": "2025-11-10T12:05:00Z"
    },
    {
      "id": "f1e9b77c-d8bb-45cd-913c-114c49f0e922",
      "category_name": "roupas",
      "created_at": "2025-11-10T12:10:00Z",
      "updated_at": "2025-11-10T12:10:00Z"
    }
    // ... mais categorias
  ]
}
```

**Response (500 Error):**
```json
{
  "message": "GET CATEGORY ERROR",
  "error": "Unknown error occurred while reading database."
}
```

---

#### 2. Buscar Categoria por ID

**Endpoint:** `GET /api/v1/category/:id_category`

**Parâmetros:**
- `id_category` (string, obrigatório) - ID da categoria

**Request:**
```bash
GET http://localhost:3000/api/v1/category/b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e
```

**Response (200 OK):**
```json
{
  "message": "GET CATEGORY BY ID SUCCESS",
  "data": {
    "id": "b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e",
    "category_name": "eletronicos",
    "created_at": "2025-11-10T12:00:00Z",
    "updated_at": "2025-11-10T12:00:00Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "message": "b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e - CATEGORY NOT FOUND",
  "data": []
}
```

**Response (500 Error):**
```json
{
  "message": "GET CATEGORY BY ID ERROR",
  "error": "Unknown error occurred while reading database."
}
```

---

### 🗄️ Endpoint de Banco de Dados

#### Obter Todo o Banco de Dados

**Endpoint:** `GET /api/v1/database`

**Request:**
```bash
GET http://localhost:3000/api/v1/database
```

**Response (200 OK):**
```json
{
  "message": "GET DATABASE SUCCESS",
  "data": {
    "categories": [
      {
        "id": "b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e",
        "category_name": "eletronicos",
        "created_at": "2025-11-10T12:00:00Z",
        "updated_at": "2025-11-10T12:00:00Z"
      }
      // ... mais categorias
    ],
    "products": [
      {
        "id": "f4b9e8b3-1c4f-4f7a-915d-6a3a1bbad876",
        "product_name": "fone_de_ouvido_bluetooth",
        "description": "Fone sem fio com cancelamento de ruído e bateria de 20 horas.",
        "id_category": "b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e",
        "category_name": "eletronicos",
        "created_at": "2025-11-11T09:00:00Z",
        "updated_at": "2025-11-11T09:00:00Z"
      }
      // ... mais produtos
    ]
  }
}
```

**Response (204 No Content - Banco vazio):**
```json
{
  "message": "DATABASE IS EMPTY",
  "data": []
}
```

**Response (500 Error):**
```json
{
  "message": "GET DATABASE ERROR",
  "error": "Unknown error occurred while reading database."
}
```

---

## 💡 Exemplos de Uso

### Usando cURL

#### Listar todos os produtos:
```bash
curl http://localhost:3000/api/v1/product
```

#### Buscar produto por ID:
```bash
curl http://localhost:3000/api/v1/product/f4b9e8b3-1c4f-4f7a-915d-6a3a1bbad876
```

#### Buscar produtos por categoria:
```bash
curl http://localhost:3000/api/v1/product/by_category/b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e
```

#### Listar todas as categorias:
```bash
curl http://localhost:3000/api/v1/category
```

---

### Usando JavaScript (Fetch API)

```javascript
// Listar todos os produtos
fetch('http://localhost:3000/api/v1/product')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));

// Buscar produto por ID
fetch('http://localhost:3000/api/v1/product/f4b9e8b3-1c4f-4f7a-915d-6a3a1bbad876')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));

// Buscar produtos por categoria
fetch('http://localhost:3000/api/v1/product/by_category/b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

---

### Usando Axios (JavaScript/Node.js)

```javascript
const axios = require('axios');

// Listar todos os produtos
axios.get('http://localhost:3000/api/v1/product')
  .then(response => console.log(response.data))
  .catch(error => console.error('Erro:', error));

// Buscar produto por ID
axios.get('http://localhost:3000/api/v1/product/f4b9e8b3-1c4f-4f7a-915d-6a3a1bbad876')
  .then(response => console.log(response.data))
  .catch(error => console.error('Erro:', error));
```

---

### Usando Python (requests)

```python
import requests

# Listar todos os produtos
response = requests.get('http://localhost:3000/api/v1/product')
print(response.json())

# Buscar produto por ID
response = requests.get('http://localhost:3000/api/v1/product/f4b9e8b3-1c4f-4f7a-915d-6a3a1bbad876')
print(response.json())

# Buscar produtos por categoria
response = requests.get('http://localhost:3000/api/v1/product/by_category/b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e')
print(response.json())
```

---

## 📊 Estrutura de Dados

### Produto (Product)

```json
{
  "id": "string (UUID)",
  "product_name": "string",
  "description": "string",
  "id_category": "string (UUID)",
  "category_name": "string",
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

### Categoria (Category)

```json
{
  "id": "string (UUID)",
  "category_name": "string",
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

---

## 📝 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 204 | No Content - Nenhum conteúdo encontrado |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro interno do servidor |

---

## 🔒 Segurança

- **Helmet** - Configurado para adicionar headers de segurança HTTP
- **CORS** - Habilitado para permitir requisições de qualquer origem (configurável)

---

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🤝 Contribuindo

Este é um projeto didático, mas sugestões e melhorias são sempre bem-vindas!

---

## 📧 Contato

Para dúvidas ou sugestões sobre este projeto, sinta-se à vontade para abrir uma issue ou entrar em contato.

wictor.backup@gmail.com

---

**Desenvolvido para fins educacionais 📚**

