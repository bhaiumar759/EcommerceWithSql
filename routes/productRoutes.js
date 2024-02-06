const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// CREATE: Add a new product
router.post('/products', productController.createProduct);

// READ: Get all products
router.get('/products', productController.getAllProducts);

// // READ: Get a specific product by ID
router.get('/products/:productId', productController.getOneProduct);

// // UPDATE: Update a product by ID
router.put('/products/update', productController.updateProduct);

// // DELETE: Delete a product by ID
router.delete('/products/:productId', productController.deleteProduct);


module.exports = router;
