const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please provide an amount'],
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account',
  },
  status: {
    type: String,
    enum: ['one-time', 'recurring'],
    default: 'one-time',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

incomeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name',
  });
  next();
});

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
