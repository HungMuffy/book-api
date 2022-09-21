const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Book = require('../models/book');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('Connect successfully!!!');
});

const books = JSON.parse(
  fs.readFileSync(`${__dirname}/book-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Book.create(books);
    console.log('Data successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Book.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
}

if (process.argv[2] === '--delete') {
  deleteData();
}
