const express = require('express');
const app = express();
const morgan = express('morgan');

const booksRouter = require('./routes/bookRoutes');
// MiddleWare
app.use(express.json());

if (process.argv.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/products', booksRouter);

module.exports = app;
