const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please provide your firstname'],
  },
  lastname: {
    type: String,
    required: [true, 'Please provide your lastname'],
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, 'That username is already taken, pleae try another'],
  },
  password: {
    type: String,
    required: [true, 'please provide a valid password'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
