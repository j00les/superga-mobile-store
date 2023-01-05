const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

//admin-side

router.post('/login', AdminController.login);
router.post('/register', AdminController.register);

//products
router.get('/products', AdminController.getAllProduct);
router.post('/products', AdminController.createProduct);
router.get('/products/:id', AdminController.getProductById);
router.put('/products/:id', AdminController.updateProduct);
router.delete('/products/:id', AdminController.deleteProduct);

//category
router.get('/categories', AdminController.getCategory);
router.post('/categories', AdminController.createCategory);
router.get('/categories/:id', AdminController.getCategoryById);
router.put('/categories/:id', AdminController.updateCategory);

router.delete('/categories/:id', AdminController.deleteCategory);

module.exports = router;
