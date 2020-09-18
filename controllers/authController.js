const User = require('../models/UserModel');
const Account = require('../models/AccountModel');
const AppError = require('../util/AppError');
const catchAsync = require('../util/CatchAsync');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const signToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email,
  });
  const userAccount = new Account({
    user: newUser._id,
    accountOwner: `${newUser.firstname} ${newUser.lastname}`,
  });
  await userAccount.save();
  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError('Please enter your username or password', 400));
  }
  const user = await User.findOne({ username }).select('+password');

  if (!user || !(await user.authenticate(password))) {
    return next(new AppError('Incorrect username or password', 401));
  }
  createAndSendToken(user, 200, res);
});
