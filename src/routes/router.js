const router = require('express').Router();
const Controller = require('../controllers/Controller')


router.get('/index', (req, res) => {
    res.json({
        message: 'rota index',
        data: []
    })
})

// const database => src/database.json
router.get('/database', Controller.database)
router.get('/product', Controller.getProduct)
router.get('/category', Controller.getCategory)
router.get('/product/by_category/:id_category', Controller.getProductByCategory)
router.get('/product/:id_product', Controller.getProductById)
router.get('/category/:id_category', Controller.getCategoryById)

module.exports = router