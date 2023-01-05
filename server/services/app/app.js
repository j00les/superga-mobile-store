if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4002;
const cors = require('cors');
const errorHandler = require('./middlewares/error');
const router = require('./routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('user-POSTGRES-server', PORT);
});
