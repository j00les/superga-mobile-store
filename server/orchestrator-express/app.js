const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;
const cors = require('cors');

const User = require('./controllers/userContoller');
const Product = require('./controllers/productController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//users
app.get('/users', User.findAll);
app.post('/users', User.create);
app.get('/users/:id', User.findById);
app.delete('/users/:id', User.delete);

//products
app.get('/products', Product.findAll);
app.post('/products', Product.create);
app.get('/categories', Product.findCategory);
app.get('/products/:id', Product.getProductById);
app.put('/products/:id', Product.update);
app.delete('/products/:id', Product.delete);

app.listen(PORT, () => {
  console.log('orchestrator-express', PORT);
});
