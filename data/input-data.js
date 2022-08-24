const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Product = require('./../models/product');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('Connect successfully!!!');
});

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/product-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Product.create(products);
    console.log('Data successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
}

if (process.argv[2] === '--delele') {
  deleteData();
}
