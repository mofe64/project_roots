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
});

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
