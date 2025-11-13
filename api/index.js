// Wrapper para o Vercel - não modifica o projeto original
// Este arquivo recria o app Express sem app.listen() para funcionar no Vercel

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const router = require('../src/routes/router');
require('dotenv').config();

const app = express();

// Configurações (mesmas do server.js original)
app.use(cors({
    methods: ['GET'],
    origin: ['*']
}));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rota raiz
app.get('/', (req, res) => {
    // Usa a URL do Vercel automaticamente se BASE_URL não estiver definida
    const BASE_URL = process.env.BASE_URL || `https://${req.headers.host}`;
    res.status(200).json({
        message: "URL's API",
        data: [
            {
                base_url: BASE_URL,
                json_database: `${BASE_URL}/api/v1/database`
            },
            [{
                product: {
                    all: `${BASE_URL}/api/v1/product`,
                    by_category: `${BASE_URL}/api/v1/product/by_category/:id_category`,
                    by_id: `${BASE_URL}/api/v1/product/:id_product`
                },
                category: {
                    all: `${BASE_URL}/api/v1/category`,
                    by_id: `${BASE_URL}/api/v1/category/:id_category`
                }
            }]
        ]
    });
});

// Rotas da API
app.use('/api/v1', router);

// Exporta o app para o Vercel (sem app.listen())
module.exports = app;

