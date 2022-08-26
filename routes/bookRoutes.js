const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

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
