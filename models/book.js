const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A book must have a name'],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'product must have a price'],
  },
  isbn: {
    type: String,
    required: [true, 'A book must have a isbn code'],
    unique: true,
  },
  author: {
    type: [String],
    required: [true, 'A book must have author'],
  },
  rating: {
    type: Number,
    default: 4,
    enum: {
      min: [1, `A rating is not less than 1-start`],
      max: [5, `A rating is not greater than 5-start`],
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    trim: true,
  },
  priceDiscount: Number,
  images: [String],
  features: {
    type: String,
    trim: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
