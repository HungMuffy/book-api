const Book = require('../models/bookModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.aliasTopBooks = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,description,author';
  next();
};

exports.getAllBook = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Book.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const books = await features.query;

  // Send response
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books,
    },
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new AppError(`This book was not found with this ID`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!book) {
    return next(new AppError(`This book was not found with this ID`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      book: newBook,
    },
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next(new AppError(`This book was not found with this ID`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getBookStats = catchAsync(async (req, res, next) => {
  const stats = await Book.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.3 } },
    },
    {
      $group: {
        _id: { $toUpper: '$level' },
        numBooks: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        avgRating: -1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyBook = catchAsync(async (req, res) => {
  const year = req.params.year * 1;
  const book = await Book.aggregate([
    {
      $unwind: '$publishDates',
    },
    {
      $match: {
        publishDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$publishDates' },
        numBooksPublishes: { $sum: 1 },
        books: {
          $push: '$name',
        },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $sort: { month: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: book.length,
    data: book,
  });
});
