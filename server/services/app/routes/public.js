const express = require('express');
const router = express.Router();
const PubController = require('../controllers/pubController');

router.get('/products', PubController.getAllProduct);
router.get('/categories', PubController.getAllCategory);
router.get('/categories/:id', PubController.getCategoryById);
router.get('/products/:id', PubController.getProductById);

module.exports = router;
