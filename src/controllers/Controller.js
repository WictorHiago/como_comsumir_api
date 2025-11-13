const fs = require('fs');
const path = require('path');

class Controller {

    async index(request, response) {
        response.send('Hello World!');
    }

    async database(request, response) {
        const databasePath = path.join(__dirname, '../database.json');

        try {
            const rawData = fs.readFileSync(databasePath, 'utf8');
            
            if (!rawData.trim()) {
                return response.status(204).json({
                    message: 'DATABASE IS EMPTY',
                    data: []
                });
            }

            const data = JSON.parse(rawData);

            response.json({
                message: 'GET DATABASE SUCCESS',
                data
            });

        } catch (error) {

            response.status(500).json({
                message: 'GET DATABASE ERROR',
                error: 'Unknown error occurred while reading database.'
            });
        }
    }

    async getProduct (request, response) {
        const database = JSON.parse(fs.readFileSync(path.join(__dirname, '../database.json'), 'utf8'));

        try {
            const products = database.products;

            response.json({
                message: 'GET PRODUCT SUCCESS',
                data: products
            });
        } catch (error) {

            response.status(500).json({
                message: 'GET PRODUCT ERROR',
                error: 'Unknown error occurred while reading database.'
            });
        }
    }

    async getCategory (request, response) {
        const database = JSON.parse(fs.readFileSync(path.join(__dirname, '../database.json'), 'utf8'));

        try {
            const categories = database.categories; 

            response.json({
                message: 'GET CATEGORY SUCCESS',
                data: categories
            });
        } catch (error) {

            response.status(500).json({
                message: 'GET CATEGORY ERROR',
                error: 'Unknown error occurred while reading database.'
            });
        }
    }

    async getProductByCategory (request, response) {
        const database = JSON.parse(fs.readFileSync(path.join(__dirname, '../database.json'), 'utf8'));
        const { id_category } = request.params;
        
        try {
            const categoryExist = database.categories.find(category => category.id === id_category);
            if (!categoryExist) {
                return response.status(404).json({
                    message: 'CATEGORY NOT FOUND',
                    data: []
                });
            }

            const productsByCategory = database.products.filter(product => product.id_category === id_category);

            if (productsByCategory.length === 0) {
                return response.status(204).json({
                    message: 'PRODUCT BY CATEGORY NOT FOUND',
                    data: []
                });
            }

            response.json({
                message: 'GET PRODUCT BY CATEGORY SUCCESS',
                data: productsByCategory
            });
        } catch (error) {
            response.status(500).json({
                message: 'GET PRODUCT BY CATEGORY ERROR',
                error: 'Unknown error occurred while reading database.'
            });
        }
    }

    async getProductById (request, response) {
        const database = JSON.parse(fs.readFileSync(path.join(__dirname, '../database.json'), 'utf8'));

        try {
            const { id_product } = request.params

            const product_exist = database.products.find((product) => {
                return product.id === id_product
            })

            if (!product_exist) {
                return response.status(404).json({
                    message: `${id_product} - PRODUCT NOT FOUND`,
                    data: []
                });
            }

            response.json({
                message: 'GET PRODUCT BY ID SUCCESS',
                data: product_exist
            });

        } catch (error) {
            response.status(500).json({
                message: 'GET PRODUCT BY ID ERROR',
                error: 'Unknown error occurred while reading database.'
            });
        }
    }

    async getCategoryById(request, response) {
        const database = JSON.parse(fs.readFileSync(path.join(__dirname, '../database.json'), 'utf8'));

        const { id_category } = request.params;

        try {
            const categoryExist = database.categories.find((category) => {
                return category.id === id_category
            })

            if (!categoryExist) {
                return response.status(404).json({
                    message: `${id_category} - CATEGORY NOT FOUND`,
                    data: []
                });
            }

            response.json({
                message: 'GET CATEGORY BY ID SUCCESS',
                data: categoryExist
            });
        } catch (error) {

            response.status(500).json({
                message: 'GET CATEGORY BY ID ERROR',
                error: 'Unknown error occurred while reading database.'
            });
        }
    }
}

module.exports = new Controller();
