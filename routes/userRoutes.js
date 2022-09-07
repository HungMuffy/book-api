const express = require('express');
const Router = express.Router();

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

Router.post('/signup', authController.signUp);

Router.route('')
  .get(userController.getAllUsers)
  .post(userController.createUser);

Router.route('')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
