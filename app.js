const express = require('express');
const app = express();
const morgan = express('morgan');

const productsRouter = require('./routes/productRoutes');
// MiddleWare
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>');
});

app.use('/api/v1/products', productsRouter);

// app.use(errorHandler);
// app.use(notFoundMiddleWare);

module.exports = app;
