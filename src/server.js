const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const router = require('./routes/router')

const app = express()
const PORT = process.env.PORT
const BASE_URL = process.env.BASE_URL

app.use(cors({
    methods: ['GET'],
    origin: ['*']
}))

app.use (helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
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
                    by_category: `${BASE_URL}/product/by_category/:id_category`,
                    by_id: `${BASE_URL}/product/:id_product`
                },
                category: {
                    all: `${BASE_URL}/category`,
                    by_id: `${BASE_URL}/category/:id_category`
                }
            }]
        ]
    })
})


app.use('/api/v1', router)

app.listen(3000, () => {
    console.log(`Server running on port ${PORT} - ${BASE_URL}`)
})