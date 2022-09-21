const express = require('express');
<<<<<<< HEAD
const router = express.Router();

const bookController = require('../controllers/bookController');

router.route('/monthly-book/:year').get()

router.route('/book-stats').get(bookController.getBookStats);

router
  .route('/top-5-best-books')
  .get(bookController.aliasTopBooks, bookController.getAllBook);

router.route('').get(bookController.getAllBook).post(bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
=======
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
>>>>>>> remotes/origin/master
