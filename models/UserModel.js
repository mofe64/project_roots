const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
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
      required: [true, 'Please provide a valid password'],
      select: false,
      minlength: [8, 'password must be at least 8 characters long'],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        //only works on save
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords do not match',
      },
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      //select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('account', {
  ref: 'Account',
  foreignField: 'user',
  localField: '_id',
  justOne: true,
});

//pre find hook

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'account',
    select: 'totalIncome _id totalExpense balance accountOwner',
  });
  next();
});

//pre save hook
userSchema.pre('save', async function (next) {
  //run function if password was modified
  if (!this.isModified('password')) return next();

  //hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.authenticate = async function (givenpassword) {
  return await bcrypt.compare(givenpassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
