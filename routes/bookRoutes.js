const express = require('express');
const Router = express.Router();
const authController = require('./../controllers/authController');
const bookController = require('../controllers/bookController');

Router.route('/monthly-book/:year').get(bookController.getMonthlyBook);

Router.route('/book-stats').get(bookController.getBookStats);

Router.route('/top-5-best-books').get(
  bookController.aliasTopBooks,
  bookController.getAllBook
);

Router.route('')
  .get(authController.protect, bookController.getAllBook)
  .post(bookController.createBook);

Router.route('/:id')
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    bookController.deleteBook
  );

module.exports = Router;
