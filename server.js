const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNHANDLE EXCEPTION! 😒');
  console.log(err.name, err.message);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB Connect successfully!!!');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLE REJECTION ERROR!...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
