const express = require('express');
const morgan = require('morgan');

const app = express();

const booksRouter = require('./routes/bookRoutes');
// MiddleWare
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/books', booksRouter);

module.exports = app;
