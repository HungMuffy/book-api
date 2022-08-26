const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
  {
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
      min: [1, `A rating is not less than 1-start`],
      max: [5, `A rating is not greater than 5-start`],
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
      select: false,
    },
    publishDates: [Date],
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
    languagues: {
      type: [String],
      default: ['English'],
    },
    level: {
      type: String,
      enum: {
        values: ['beginner', 'immediate', 'advanced'],
        message: `{VALUE} is not supported!!`,
      },
      required: [true, 'A book must have a level reading!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.virtual('totalPrice').get(function () {
  return this.price - (this.priceDiscount ? this.priceDiscount : 0);
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
